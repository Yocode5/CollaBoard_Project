const { errorResponse } = require('../utils/response');

const validateRequest = (requiredFields) => {
    return (req, res, next) => {
        const errors = [];

        requiredFields.forEach(field => {
            if (!req.body || !req.body[field]) {
                errors.push({ field, message: `${field} is required` });
            }
        });

        if (errors.length > 0) {
            return errorResponse(res, 400, 'Validation Error', errors);
        }

        next();
    };
};

module.exports = {
    validateRequest
};