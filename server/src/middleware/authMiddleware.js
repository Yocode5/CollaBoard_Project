const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('Access denied. No token provided.');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];

        // Validate mock token
        if (token !== 'mock-jwt-token-xyz123') {
            const error = new Error('Invalid or expired token.');
            error.statusCode = 403;
            throw error;
        }

        // Attach mock user payload to request
        req.user = {
            id: '1',
            email: 'admin@collaboard.com'
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;