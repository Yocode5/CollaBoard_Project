const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const app = require('./app');
const config = require('./config');

const Project = require('./models/Project');


// =========================
// CREATE HTTP SERVER
// =========================

const httpServer = http.createServer(app);


// =========================
// CREATE SOCKET.IO SERVER
// =========================

const io = new Server(httpServer, {
    cors: {
        origin: config.clientOrigin,
        credentials: true
    }
});


// Make Socket.IO available to Express controllers
app.set('io', io);


// =========================
// AUTHENTICATE SOCKET HANDSHAKE
// =========================

io.use((socket, next) => {

    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error('NO_TOKEN'));
    }

    try {

        const payload = jwt.verify(
            token,
            config.jwtSecret
        );

        socket.user = {
            id: payload.id,
            email: payload.email
        };

        next();

    } catch (error) {

        next(new Error('BAD_TOKEN'));
    }
});


// =========================
// SOCKET CONNECTION
// =========================

io.on('connection', (socket) => {

    console.log(
        'Socket connected:',
        socket.user.email
    );


    // =========================
    // JOIN PROJECT ROOM
    // =========================

    socket.on('project:join', async (projectId) => {

        try {

            if (
                typeof projectId !== 'string' ||
                !mongoose.Types.ObjectId.isValid(projectId)
            ) {
                socket.emit('project:join_error', {
                    message: 'Invalid project ID.'
                });

                return;
            }

            const project = await Project.findById(projectId)
                .select('members');

            if (!project) {
                socket.emit('project:join_error', {
                    message: 'Project not found.'
                });

                return;
            }

            const isMember = project.members.some(
                (memberId) =>
                    memberId.toString() === socket.user.id.toString()
            );

            if (!isMember) {

                socket.emit('project:join_error', {
                    message: 'You are not a member of this project.'
                });

                return;
            }

            const roomName = `project:${projectId}`;

            socket.join(roomName);

            console.log(
                `Socket ${socket.user.email} joined ${roomName}`
            );

            socket.emit('project:joined', {
                projectId
            });

        } catch (error) {

            console.error(
                'Error joining project room:',
                error.message
            );

            socket.emit('project:join_error', {
                message: 'Unable to join project.'
            });
        }
    });


    // =========================
    // DISCONNECT
    // =========================

    socket.on('disconnect', () => {

        console.log(
            'Socket disconnected:',
            socket.user.email
        );
    });
});


// =========================
// CONNECT TO MONGODB
// =========================

mongoose.connect(config.mongoUri)
    .then(() => {

        console.log(
            'Connected to MongoDB successfully'
        );

        httpServer.listen(
            config.port,
            () => {

                console.log(
                    `Server is running on port ${config.port}`
                );

            }
        );

    })
    .catch((error) => {

        console.error(
            'Error connecting to MongoDB:',
            error.message
        );

    });