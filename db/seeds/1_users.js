exports.seed = (knex) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert([
      {
        id: 1,
        name: 'Bunny',
        password: 'Bunny'
      },
      {
        id: 2,
        name: 'Amalia',
        password: 'Amalia'
      },
    ])
  }).then(() => {
    return knex.raw(
      "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
    )
  })
}
