const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/users-controller');

const router = express.Router();

router.get('/:uid', userControllers.getUserById);

router.post(
    '/',
    [check('about').isLength({ max: 500 })], // Array of middlewares checking for validation
    userControllers.createUser
);

router.patch('/:uid', userControllers.updateUserData);

router.delete('/:uid', userControllers.deleteUser);

module.exports = router;
