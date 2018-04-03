
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.integer('weight').notNullable();
    table.integer('sets').notNullable();
    table.integer('reps').notNullable();
    table.integer('workout_id').notNullable();
    table.foreign('workout_id').references('workouts.id')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises')
};
