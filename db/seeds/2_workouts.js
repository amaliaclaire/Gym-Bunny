exports.seed = (knex) => {
  return knex('workouts').del()
  .then(() => {
    return knex('workouts').insert([
      {
        id: 1,
        name: 'Monday',
        user_id: 1
      },
      {
        id: 2,
        name: 'Legs',
        user_id: 2
      },
    ])
  }).then(() => {
    return knex.raw(
      "SELECT setval('workouts_id_seq', (SELECT MAX(id) FROM workouts));"
    )
  })
}
