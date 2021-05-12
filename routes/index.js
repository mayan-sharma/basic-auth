const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use('/user', require('./user'));

/**
 * @method GET
 * @route /api/securedRoute
 * @Authorization BEARER <Token>
 */
router.get('/securedRoute', auth, (req, res) => {
    return res.status(200).json({
        msg: 'Welcome to a secured route!'
    })
});

module.exports = router;