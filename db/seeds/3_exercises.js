exports.seed = (knex) => {
  return knex('exercises').del()
  .then(() => {
    return knex('exercises').insert([
      {
        id: 1,
        name: 'chest',
        weight: 15,
        sets: 4,
        reps: 10,
        workout_id: 1
      }
    ])
  }).then(() => {
    return knex.raw(
      "SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises));"
    )
  })
}
