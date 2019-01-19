const mongoose = require('mongoose')

const User = mongoose.model('users')


module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const { email, password, first_name, last_name, role } = req.body;

        const existUser = await User.findOne({ email: email });

        if (existUser) {
            return res.status(403).send({ error: 'This email address is already exists!' })
        }
        const newUser = new User({
            email,
            password,
            first_name,
            last_name,
            role
        })
        await newUser.save();
        res.status(200).send(newUser)
    },
    login: (req, res) => {
        res.status(200).send(req.user)
    },
    getCurrentUser: (req, res) => {
        res.status(200).send(req.user);
    },
    logout: (req, res) => {
        req.logout();
        res.send('succsess')
        // res.redirect('/')
    }
}