exports.seed = (knex) => {
  return knex('motivate').del()
  .then(() => {
    return knex('motivate').insert([
      {
        id: 1,
        description: 'thick thighs and pretty eyes',
      },
      {
        id: 2,
        description: 'sweat like a pig to look like a fox',
      },
      {
        id: 3,
        description: 'thank god for thick girls',
      },
      {
        id: 4,
        description: 'lauren is pretty',
      }
    ])
  }).then(() => {
    return knex.raw(
      "SELECT setval('motivate_id_seq', (SELECT MAX(id) FROM motivate));"
    )
  })
}
