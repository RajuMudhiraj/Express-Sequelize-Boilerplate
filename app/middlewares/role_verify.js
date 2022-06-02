
exports.role_verify = (roles_array) => {
    return (req, res, next) => {
        try {

            if (req.user.roles.includes(roles_array)) {
                next()
            }
            else {
                res.status(403).json({ success: false, message: "You are not authorized" })
            }
        }
        catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}