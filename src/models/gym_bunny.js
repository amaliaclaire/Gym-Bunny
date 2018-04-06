const uuid = require('uuid/v4')
const workouts = []
const knex = require('../../db/connection.js')


function getAll () {
  return knex.from('workouts')
  .innerJoin('exercises', 'workouts.id', 'exercises.workout_id')

}

function getWorkoutById (id) {
  return knex('workouts')
  .where('id', id)
  .first()
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

// function deleteWorkoutById (id) {
//   return knex('workouts')
//   .where({id: id}, '*')
//   .del()
// }
module.exports = {
  getAll, getWorkoutById, createWorkout, updateSingleWorkout
}
