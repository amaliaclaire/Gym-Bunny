
const model = require('../models/gym_bunny')

function getAllWorkouts (req, res, next) {
  console.log('hello');

    const workouts = model.getAll()
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => next(err))
}

module.exports = {getAllWorkouts}
