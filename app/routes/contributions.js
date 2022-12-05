/*
Contributions' Router
This router contains all endpoints for the Contribution entit
*/
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const contributorCtrl = require('../controllers/contributorController');

router.get('/', auth, contributorCtrl.allContributions);

module.exports = router;