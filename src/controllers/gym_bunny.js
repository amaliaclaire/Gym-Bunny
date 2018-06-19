
const model = require('../models/gym_bunny')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = 'secret'
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);




function getAllWorkouts (req, res, next) {
    const workouts = model.getAll()
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => next(err))
}

function workoutsWithExercises (req, res, next) {
  debugger
  const workoutsAndExercises = model.getAllExercisesWithWorkoutsNested()
    .then(workoutsAndExercises => {
      debugger
      res.json(workoutsAndExercises)
    })
    .catch(err => {
      debugger
      next(err)
    })
}

function getSingleWorkout (req, res, next) {
  let id = req.params.id
  const singleWorkout = model.getWorkoutById(id)
  .then(workout => {
    res.json(workout)
  })
  .catch(err => next(err))
}

function createWorkout (req, res, next) {
  console.log(req.body);
  let {name, user_id} = req.body

  model.createWorkout(name, user_id)
  .then(workout => {
    res.json(workout)
  })
  .catch(err => next(err))
}

function updateWorkout (req, res, next) {
  let {name, user_id} = req.body
  model.updateSingleWorkout(name, user_id)
  .then(workout => {
    res.json(workout)
  })
  .catch(err => next(err))
}

function deleteWorkout (req, res, next) {
  let id = req.params.id
  model.deleteWorkoutById(id)
  .then(workout => {
    res.json(workout)
  })
  .catch(err => next(err))
}

function createExercise (req, res, next) {
  let {exercise_name, exercise_weight, exercise_sets, exercise_reps, workout_id} = req.body

  model.createExercise(exercise_name, exercise_weight, exercise_sets, exercise_reps, workout_id)
  .then(exercise => {
    res.json(exercise)
  })
  .catch(err => next(err))
}

function deleteExercise (req, res, next) {
  let id = req.params.id
  model.deleteExerciseById(id)
  .then(exercise => {
    res.json(exercise)
  }).catch(err => next(err))
}

// login to user

function loginToUser (req, res, next) {
  let {username, password} = req.body
  let id
  let hashedPassword
  console.log(req.body);
  model.getByUsername(username)
  .then(user => {
    console.log('user:', user);
    id = user.id
    hashedPassword = user.password

    return bcrypt.compare(password, hashedPassword)
  }).then(result => {
    console.log('result: ', result);
    // result is from line 85
    if (result === true) {
      return jwt.sign ({id}, secret, { expiresIn: '30 day'})
    } else {
      throw new Error("Invalid user ID or password")
    }
  }).then(token => {
    res.status(201).set('Authorization', `Bearer: ${token} `).json({ result: 'logged in accepted'})
  })
  .catch(err => next(err))
}

function signUpUser (req, res, next) {
  let {username, password} = req.body
  let id
  let hashedPassword = bcrypt.hashSync(password, salt)

  model.getByUsername(username)
  .then(user => {
    console.log('user', user);
    if(!user) {
      return model.signUpUser(username, hashedPassword)
    } else {
      throw Error("username is already taken. Please create new username")
    }
  }).then(newUser => {
    console.log('newUser', newUser);
    res.status(201).json({result: `${newUser[0]} has been created`})
  })
  .catch(err => next (err))

  }

  function getMotivationalQuotes (req, res, next) {
    const quotes = model.getAllMotivationQuotes()
    .then(quotes => {
      res.json(quotes)
    })
    .catch(err => next(err))
  }


module.exports = {getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout, workoutsWithExercises, createExercise, loginToUser, signUpUser, getMotivationalQuotes, deleteExercise}
