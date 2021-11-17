const cors = require('cors');
const express = require('express');
const connectDb = require('./mongoose');
const session = require('express-session');

const app = express();

// connects to mongoDB
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        // does not allow js to access this cookie
        httpOnly: true,
        // expiration time
        maxAge: process.env.SESSION_LIFETIME,
        // same site access
        sameSite: true,
        // only send the cookie for https clients
        secure: true
    }
}));

app.use('/api', require('./routes/index'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, err => {
    if (err) console.log(`Error running on port ${PORT}`);
    else console.log(`Server running on port ${PORT}`);
});