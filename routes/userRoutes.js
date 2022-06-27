const express = require('express');
const router = express.Router();

const { getAllusers, home, getUser, login } = require('../Controllers/userController');

router.get('/', home)
router.get('/users', getAllusers)
router.get('/user/:email', getUser)
router.post('/user/login', login)

module.exports = {router}