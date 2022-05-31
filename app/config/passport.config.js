const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/User');
const passport = require('passport');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ where: { id: jwt_payload.user_id } });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }
}));

module.exports = { passport };
