const express = require('express');

const auth = require('../middlewares/auth');
const session = require('./middlewares/session');
const { welcome, secured } = require('../controllers/test');

const router = express.Router();

/**
 * @method GET
 * @route /api/
 * @Authorization None
 */
router.get('/', welcome)

/**
 * @method GET
 * @route /api/securedRoute
 * @Authorization BEARER <Token>
 */
router.get('/secured/token', auth, secured);

/**
 * @method GET
 * @route /api/securedRoute
 * @Authorization BEARER <Token>
 */
router.get('/secured/session', session, secured);