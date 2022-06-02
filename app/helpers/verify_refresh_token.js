const jwt = require('jsonwebtoken');
const { User_token } = require('../models/User_token');

exports.verify_refresh_token = (refresh_token) => {

    const secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;

    return new Promise(async (resolve, reject) => {
        try {
            const doc = await User_token.findOne({ where: { token: refresh_token } });
            if (!doc) {
                return reject({ success: false, message: "Invalid refresh token" })
            }
            else {
                jwt.verify(refresh_token, secret_key, (err, token_details) => {
                    if (err) {
                        return reject({ success: false, message: "Invalid refresh token" })

                    }
                    else {
                        return resolve({
                            success: true,
                            message: "Valid refresh token",
                            token_details,
                            createdAt: doc.createdAt

                        })
                    }
                });
            }
        } catch (error) {
            return reject({ success: false, message: error.message });
        }
    })
}
