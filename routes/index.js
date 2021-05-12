const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const User = require('../models/user');

router.use('/user', require('./user'));

/**
 * @method GET
 * @route /api/
 * @Authorization None
 */
router.get('/', (req, res) => {
    return res.status(200).json({
        msg: 'Welcome!'
    })
})

/**
 * @method GET
 * @route /api/securedRoute
 * @Authorization BEARER <Token>
 */
router.get('/securedRoute', auth, async (req, res) => {

    const userId = req.user.id;
    const user = await User.findById(userId);
    
    return res.status(200).json({
        msg: 'Welcome to a secured route!',
        name: user.name,
        email: user.email
    })
});

module.exports = router;