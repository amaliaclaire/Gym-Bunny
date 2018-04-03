exports.seed = (knex) => {
  return knex('motivate').del()
  .then(() => {
    return knex('motivate').insert([
      {
        id: 1,
        description: 'thick thighs and pretty eyes',
      }
    ])
  }).then(() => {
    return knex.raw(
      "SELECT setval('motivate_id_seq', (SELECT MAX(id) FROM motivate));"
    )
  })
}
