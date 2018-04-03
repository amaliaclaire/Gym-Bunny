
exports.up = function(knex, Promise) {
  return knex.schema.createTable('motivate', (table) => {
    table.increments();
    table.text('description').notNullable();
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('motivate')
};
