class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;

        //If the status code (error code) with number 4 (such as 400, 404, etc) the status message is "fail"
        //If not, 500 for example, the status is "error"
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;