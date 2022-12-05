/*
Users' Router
This router contains all endpoints for the User entit
*/
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require('../controllers/userController');

router.get('/', userCtrl.getAll);

router.get('/:id', auth, userCtrl.getById);

router.post('/', auth, userCtrl.create);

router.post('/:id', auth, userCtrl.update);

router.post('/:id/change-password', auth, userCtrl.changePassword);

router.delete('/:id', auth, userCtrl.remove);

module.exports = router;
