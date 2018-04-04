const uuid = require('uuid/v4')
const workouts = []
const knex = require('../../db/connection.js')


function getAll () {
  return knex('workouts')

}

module.exports = {
  getAll
}
