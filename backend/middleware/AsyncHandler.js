const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        // Use existing status code if set, otherwise default to 500
        const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({
            message: err.message || 'Server Error',
            // Optionally add error stack in development mode:
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    });
};

export default asyncHandler;
