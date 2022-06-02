const { User } = require('../../models/User');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken')
const { login_body_validation } = require('../../helpers/validation_schema');
const { generate_tokens } = require('../../helpers/generate_tokens');


exports.signin_controller = async (req, res) => {

    const { email, password } = req.body;
    try {
        const { error } = login_body_validation(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details
            });
        };

        // Checking the existence of email.
        const emailExistence = await User.findOne({ where: { email } });

        if (emailExistence) {
            const isPasswordCorrect = await compare(password, emailExistence.password)
            if (isPasswordCorrect) {
                const { access_token, refresh_token } = await generate_tokens(emailExistence)
                // const token = jwt.sign(
                //     {
                //         user_id: emailExistence.id,
                //         roles: emailExistence.roles
                //     },
                //     process.env.JWT_SECRET_KEY,
                //     {
                //         expiresIn: "1h",
                //     }
                // );

                return res.status(200).json({
                    success: true,
                    name: emailExistence.name,
                    message: `You have signed in successfully!`,
                    access_token: `Bearer ${access_token}`,
                    refresh_token
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: `Wrong credentials`
                });
            }

        }
        else {
            return res.status(400).json({
                success: false,
                message: `Wrong credentials`
            });
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    };
};

