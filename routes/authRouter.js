const passport = require('passport');
const router = require('express').Router();
const authLogin = passport.authenticate('local');
const authController = require('../controllers/authController')
const requireLogin = require('../middlewares/requireLogin')


router.route('/auth/register')
    .post(authController.register);

router.route('/auth/login')
    .post(authLogin, authController.login)

router.route('/auth/logout')
    .get(authController.logout)

router.route('/auth/current_user')
    .get(requireLogin, authController.getCurrentUser)

module.exports = router;



