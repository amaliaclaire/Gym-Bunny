
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

// login to user

function loginToUser (req, res, next) {
  let {username, password} = req.body
  let id
  let hashedPassword
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
      throw Error
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
  console.log('password + hash:', password, hashedPassword);

  model.getByUsername(username)
  .then(user => {
    if(!user) {
      return model.signUpUser(username, password)
    } else {
      throw Error("username is already taken. Please create new username")
    }
  }).then(newUser => {

    // send a good status & send a good message (201)
  })
  .catch(err => next (err))

  // when i'm registering if the username is ALREADY taken (check in the database) then call an error



  }


module.exports = {getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout, workoutsWithExercises, createExercise, loginToUser, signUpUser}
