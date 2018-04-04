const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gym_bunny')

/* GET users listing. */
router.get('/workouts', ctrl.getAllWorkouts)

module.exports = router;
