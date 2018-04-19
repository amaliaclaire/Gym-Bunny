const uuid = require('uuid/v4')
const workouts = []
const knex = require('../../db/connection.js')


function getAll () {
  return knex('workouts')
}

function getAllExercisesWithWorkoutsNested () {
  return knex('workouts')
  .then(workouts => {
    const promises = workouts.map(workout => {
      return knex('exercises').where({workout_id: workout.id})
      .then(exercises => {
        workout.exercises = exercises
        return workout
        console.log('workout', workout);
      })
    })
    return Promise.all(promises)
    // console.log('promises', promises);
  })
}


function getWorkoutById (id) {
  return knex('workouts')
  .innerJoin('exercises', 'workouts.id', 'exercises.workout_id')
  .where('workouts.id', id)
  .select('workouts.name as workout_name', 'exercises.*')
  // .first()
}

function createWorkout (name, user_id) {
  return knex('workouts')
  .insert({
    name,
    user_id
  })
}

function updateSingleWorkout (name, user_id) {
  return knex('workouts')
  .update({name: name}, '*')
  .where('user_id', user_id)
}

function deleteWorkoutById (id) {
  return knex('workouts')
  .where({id: id}, '*')
  .del()
}
module.exports = {
  getAll, getWorkoutById, createWorkout, updateSingleWorkout, deleteWorkoutById, getAllExercisesWithWorkoutsNested
}
