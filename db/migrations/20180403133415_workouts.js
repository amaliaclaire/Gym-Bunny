
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workouts', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('workouts')
};
