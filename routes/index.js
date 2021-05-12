const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

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
router.get('/securedRoute', auth, (req, res) => {
    return res.status(200).json({
        msg: 'Welcome to a secured route!',
        user: req.user
    })
});

module.exports = router;