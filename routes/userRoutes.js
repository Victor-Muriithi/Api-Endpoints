const express = require('express');
const router = express.Router();

const { getAllusers, home, getUser, login, createUser, addAllUsers } = require('../Controllers/userController');

router.get('/', home)
router.get('/users', getAllusers)
router.get('/user/:email', getUser)
router.post('/user/login', login)
router.post('/user/addUser', createUser)
router.get('/users/addAllUsers', addAllUsers)

module.exports = {router}