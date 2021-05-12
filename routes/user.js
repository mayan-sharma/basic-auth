const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const db = require('../models');

/**
 * @method POST
 * @route /api/user/login
 * @Authorization None
 */
router.post('/login', async (req, res) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        
        // check if user exists
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid username or password',
            });
        } 

        // verify password
        const isPasswordValid = await bcrpyt.compare(req.body.password, user.password);

        // if password is incorrect
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: 'Invalid username or password',
            });
        }

        // generate jwt token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET.toString()
        );

        return res.status(200).json({
            msg: 'Logged in successfully',
            token,
        })

    } catch(err) {
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
});

/**
 * @method POST
 * @route /api/user/register
 * @Authorization None
 */
router.post('/register', async (req, res) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        
        // check if user already exists
        if (user) {
            return res.status(422).json({
                msg: 'User already exists'
            });
        }

        // creates new user
        let newUser = await db.User.create(req.body);

        // create a salt
        const salt = await bcrypt.genSalt(10);

        // hash the password
        newUser.password = await bcrpyt.hash(newUser.password, salt);
    
        // saves the new user in the database
        await newUser.save();

        return res.status(200).json({
            msg: 'User successfully registered',
            user: newUser
        })
    } catch(err) {
        return res.status(500).json({
            msg: 'Internal Server Error',
        });        
    }
})

module.exports = router;