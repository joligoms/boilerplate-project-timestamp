const errorHandler = (err, req, res, next) => {
    const errorMsg = err.message || 'Internal Server Error';

    console.error(errorMsg);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: errorMsg });
};

module.exports = errorHandler;