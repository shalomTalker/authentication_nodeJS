//modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan')


//  models
require('./models/User');

//docs
require('./services/passport');
const keys = require('./config/keys')

//connecting mongoDB via mongoose libary
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

// init app
const app = express();

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// routers uses
app.use(require('./routes/authRouter'))

// production`s static files config
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))

//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })

// }
// opening port
const PORT = process.env.PORT || 5000;
app.listen(PORT)