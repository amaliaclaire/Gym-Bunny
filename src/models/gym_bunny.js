const uuid = require('uuid/v4')
const workouts = []
const knex = require('../../db/connection.js')


function getAll () {
  return knex('workouts')

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
module.exports = {
  getAll, getWorkoutById, createWorkout
}
