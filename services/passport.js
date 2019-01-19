const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => done(err, null));
});



passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return done('This email address is not exists.. please register!', false)
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return done('This password does not match!', false)
        }
        done(null, user)

    } catch (error) {
        done(error, null)
    }
}))


