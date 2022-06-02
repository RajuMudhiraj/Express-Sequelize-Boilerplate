const { User_token } = require('../../models/User_token');
const { refresh_token_body_validation } = require('../../helpers/validation_schema');


exports.signout_controller = async (req, res) => {
    console.log("test", req.user);

    const { refresh_token } = req.body;
    console.log(refresh_token);
    try {
        const { error } = refresh_token_body_validation(req.body);
        if (error) {
            return res.status(400).json({
                success: false, message: error.details
            })
        };


        const user_token = await User_token.findOne({ where: { token: refresh_token, user_id: req.user.id } });
        if (!user_token) {
            return res.status(200).json({
                success: true,
                message: "Signed out successfully!"
            });
        };

        await user_token.destroy();
        return res.status(200).json({
            success: true,
            message: "Signed out successfully!"
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    };
};

