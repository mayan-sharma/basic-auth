module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.json({
            message: 'Not authenticated!'
        });
    }

    return next();
}