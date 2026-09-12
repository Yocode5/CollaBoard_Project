import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import './TaskGrid.css';
import TaskCard from './TaskCard';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function TaskGrid({ onViewTask, projectId }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let socket;

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');

                const url = projectId
                    ? `${API_URL}/api/tasks?projectId=${projectId}`
                    : `${API_URL}/api/tasks`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTasks(response.data);
            } catch (error) {
                console.error(
                    'Error fetching tasks:',
                    error
                );
            }
        };

        const connectSocket = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            socket = io(API_URL, {
                auth: {
                    token
                }
            });

            socket.on('connect', () => {
                console.log(
                    'Socket connected:',
                    socket.id
                );

                if (projectId) {
                    socket.emit(
                        'project:join',
                        projectId
                    );
                }
            });

            socket.on('connect_error', (error) => {
                console.error(
                    'Socket connection error:',
                    error.message
                );
            });

            socket.on('disconnect', (reason) => {
                console.log(
                    'Socket disconnected:',
                    reason
                );
            });

            socket.on('task:created', (task) => {
                if (
                    projectId &&
                    String(task.projectId) !== String(projectId)
                ) {
                    return;
                }

                setTasks((currentTasks) => {

                    const alreadyExists = currentTasks.some(
                        (existingTask) =>
                            existingTask._id === task._id
                    );

                    if (alreadyExists) {
                        return currentTasks;
                    }

                    return [
                        ...currentTasks,
                        task
                    ];
                });
            });

            socket.on('task:updated', (task) => {
                if (
                    projectId &&
                    String(task.projectId) !== String(projectId)
                ) {
                    return;
                }

                setTasks((currentTasks) =>
                    currentTasks.map((existingTask) =>
                        existingTask._id === task._id
                            ? task
                            : existingTask
                    )
                );
            });

            socket.on('task:deleted', ({ taskId }) => {

                setTasks((currentTasks) =>
                    currentTasks.filter(
                        (task) =>
                            task._id !== taskId
                    )
                );

            });
        };

        const start = async () => {
            await fetchTasks();

            if (projectId) {
                connectSocket();
            }
        };

        start();

        return () => {

            if (socket) {
                socket.off('connect');
                socket.off('connect_error');
                socket.off('disconnect');
                socket.off('task:created');
                socket.off('task:updated');
                socket.off('task:deleted');

                socket.disconnect();
            }
        };

    }, [projectId]);


    const todoTasks = tasks.filter(
        task => task.status === 'To Do'
    );

    const inProgressTasks = tasks.filter(
        task => task.status === 'In Progress'
    );

    const completedTasks = tasks.filter(
        task => task.status === 'Completed'
    );


    return (
        <section className="task-grid">

            {/* =========================
                TO DO
            ========================= */}

            <div className="task-column">

                <h2 className="task-column__title">
                    To Do
                </h2>

                <div className="task-column__cards">

                    {todoTasks.map(task => (

                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />

                    ))}

                </div>

            </div>


            {/* =========================
                IN PROGRESS
            ========================= */}

            <div className="task-column">

                <h2 className="task-column__title">
                    In Progress
                </h2>

                <div className="task-column__cards">

                    {inProgressTasks.map(task => (

                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />

                    ))}

                </div>

            </div>


            {/* =========================
                COMPLETED
            ========================= */}

            <div className="task-column">

                <h2 className="task-column__title">
                    Completed
                </h2>

                <div className="task-column__cards">

                    {completedTasks.map(task => (

                        <TaskCard
                            key={task._id}
                            title={task.title}
                            status={task.status}
                            assignee={task.assignee}
                            dueDate={task.dueDate}
                            onViewDetails={() =>
                                onViewTask(task)
                            }
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}