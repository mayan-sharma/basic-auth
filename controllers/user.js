const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                msg: "Invalid username or password",
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword)
            return res.status(400).json({
                msg: "Invalid username or password",
            });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET.toString(), {
                expiresIn: "3600s",
            }
        );

        res.session.userId = user._id;
        return res.status(200).json({
            msg: "logged in successfully",
            token,
            user,
        });

    } catch (err) {
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
}

exports.register = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(422).json({
                message: "User already exists",
            });
        }

        // hashing password
        let newUser = await User.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        return res.status(200).json({
            message: "User created",
            user: newUser,
        });

    } catch (err) {
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
}