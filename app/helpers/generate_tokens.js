const jwt = require('jsonwebtoken');
const { User_token } = require('../models/User_token');

exports.generate_tokens = async (user) => {
    try {
        const payload = { id: user.id, roles: user.roles };

        const access_token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "14m" }
        );

        const refresh_token = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: "30d" }
        );

        const user_token = await User_token.findOne({ where: { user_id: user.id } });
        if (user_token) {
            await user_token.destroy();
        }

        await User_token.create({ user_id: user.id, token: refresh_token });

        return Promise.resolve({ access_token, refresh_token });

    } catch (error) {
        return Promise.reject(error)
    }
}