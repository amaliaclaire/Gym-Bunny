const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gym_bunny')

/* GET workouts listing. */
router.get('/workouts', ctrl.getAllWorkouts)
router.get('/workouts/:id', ctrl.getSingleWorkout)
router.get('/workoutsWithExercises', ctrl.workoutsWithExercises)
router.post('/workouts', ctrl.createWorkout)
router.put('/workouts/:id', ctrl.updateWorkout)
router.delete('/workouts/:id', ctrl.deleteWorkout)

// Exercises Routes

router.post('/exercises', ctrl.createExercise)
router.delete('/exercises/:id', ctrl.deleteExercise)

// user routes

router.post('/login', ctrl.loginToUser)
router.post('/signUp', ctrl.signUpUser)

// Motivation Quotes routes

router.get('/motivationQuotes', ctrl.getMotivationalQuotes)



module.exports = router;
