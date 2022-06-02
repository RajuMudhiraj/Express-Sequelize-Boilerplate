
exports.verify_admin = (req, res, next) => {
    try {

        if (req.user.roles.includes("admin")) {
            next()
        }
        else {
            res.status(400).json({ message: "Users with 'admin' role can only access this api" })
        }
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed.'
        })
    }
}