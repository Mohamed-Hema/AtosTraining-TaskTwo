const express = require('express');
const router = express.Router();

const userController = require('../controllers/controller');

// Define user routes

router.get('/users', userController.getUsers);
router.post('/createuser', userController.createUser);
router.post('/roles', userController.createRoles);
router.post('/assign-role', userController.assignRolesToUser);

module.exports = router;



