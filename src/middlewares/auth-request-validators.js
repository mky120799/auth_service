const validateUserAuth = (req, res, next) => {if (!req.body.email || !req.body.password) {
    return res.status(400).json({
        message: "email or password is missing",
        data: {},
        success: false
    });
}
next();
}

  const validateIsAdmin = (req, res, next) => {
    if (!req.body.id ) {
        return res.status(401).json({
            message: "Token is missing",
            data: {},
            success: false
        });
    }
    next();
}

module.exports = {
    validateUserAuth,validateIsAdmin
};