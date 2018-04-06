
const model = require('../models/gym_bunny')

function getAllWorkouts (req, res, next) {

    const workouts = model.getAll()
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => next(err))
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
module.exports = {getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout}
