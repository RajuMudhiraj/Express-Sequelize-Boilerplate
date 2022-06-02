const jwt = require('jsonwebtoken');
const { refresh_token_body_validation } = require('../../helpers/validation_schema');
const { verify_refresh_token } = require('../../helpers/verify_refresh_token');
const { User_token } = require('../../models/User_token')

exports.refresh_token_controller = async (req, res) => {

    const { refresh_token } = req.body;
    try {
        const { error } = refresh_token_body_validation(req.body);
        if (error) {
            return res.status(400).json({
                success: false, message: error.details
            })
        }

        const { token_details, createdAt } = await verify_refresh_token(refresh_token);
        const { id, roles } = token_details;

        const payload = { id, roles }


        const access_token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "14m" }
        );

        const new_refresh_token = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: createdAt.getTime() + (1000 * 60 * 60 * 24 * 30) }
        );

        await User_token.update({ token: new_refresh_token }, { where: { user_id: id } });

        return res.status(200).json({
            success: true,
            message: `Access token and refresh tokens are created successfully!`,
            access_token: `Bearer ${access_token}`,
            new_refresh_token
        });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    };
};

