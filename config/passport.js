require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');

const options= {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log('💥')
    console.log(jwt_payload.sub)
    // console.log(jwt_payload);
    db.User.findById(jwt_payload._doc._id)
      .then(user => {
        if(user) {
          // If user is found, return null (for error) and user
          return done(null, user);
        }
        // If no user is found
        return done(null, false)
      })
      .catch(err => console.log(err));
  }));
};