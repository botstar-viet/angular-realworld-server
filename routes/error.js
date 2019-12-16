const handleError = (req, res) => {
    const error = req.error;
    const message = 'Error in' + req.method + ' ' + req.url;
    res.status(error.code).json({
        message
    });
}

module.exports = { handleError };