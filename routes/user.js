const express = require('express');

const { login, register } = require('../controllers/user');

const router = express.Router();

/**
 * @method POST
 * @route /api/user/login
 * @Authorization None
 */
router.post("/login", login);

/**
 * @method POST
 * @route /api/user/register
 * @Authorization None
 */
router.post("/register", register);

module.exports = router;