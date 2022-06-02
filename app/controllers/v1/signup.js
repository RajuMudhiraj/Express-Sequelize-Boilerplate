const { User } = require('../../models/User');
const { sign_up_body_validation } = require('../../helpers/validation_schema');
const { hashSync } = require('bcrypt');



exports.signup_controller = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const { error } = sign_up_body_validation(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details
            });
        };

        const userExistence = await User.findOne({ where: { email } });
        if (!userExistence) {

            const user = await User.create({
                name,
                email,
                password: hashSync(password, 10)
            });
            return res.status(201).json({
                success: true,
                message: `User created successfully!`,
                user
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: `User with given email already exist`,
            });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    };
};

