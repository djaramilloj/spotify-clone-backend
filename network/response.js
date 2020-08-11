exports.success = (req, res, message, status) => {
    const successMessage = {
        error: false,
        status: status || 200,
        message: message || 'operation successful'
    }
    res.send(successMessage);
}

exports.error = (req, res, message, status) => {
    const err = {
        error: true,
        status: status || 500,
        message: message || 'internal server error'
    }
    res.send(err);
}