const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gym_bunny')

/* GET users listing. */
router.get('/workouts', ctrl.getAllWorkouts)
router.get('/workouts/:id', ctrl.getSingleWorkout)
router.post('/workouts', ctrl.createWorkout)
router.put('/workouts/:id', ctrl.updateWorkout)
// router.delete('/workouts/:id', ctrl.deleteWorkout)


module.exports = router;
