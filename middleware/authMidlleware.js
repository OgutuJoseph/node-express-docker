const protect = (req, res, next) => {
    const { user } = req.session;

    if (!user) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Unauthorized'
        })
    };

    req.user = user;

    next();
};

module.exports = protect;