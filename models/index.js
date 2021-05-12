require('dotenv').config();
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

module.exports.User = require('./user');