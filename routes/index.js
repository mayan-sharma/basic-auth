const express = require('express');

const testRouter = require('./test');
const userRouter = require('./user');

const router = express.Router();

router.use('/', testRouter)
router.use('/user', userRouter);

module.exports = router;