const { User } = require('../../models/User');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.signinController = async (req, res) => {

    const { email, password } = req.body;
    try {

        // Checking the existence of email.
        const emailExistence = await User.findOne({ where: { email } });

        if (emailExistence) {
            const isPasswordCorrect = await compare(password, emailExistence.password)
            if (isPasswordCorrect) {

                const token = jwt.sign(
                    {
                        user_id: emailExistence.id,
                        roles: emailExistence.roles
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "1h",
                    }
                );

                return res.status(200).json({
                    success: true,
                    name: emailExistence.name,
                    message: `You have signed in successfully!`,
                    token: `Bearer ${token}`
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
                message: `The email does not exist`
            });
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    };
};

