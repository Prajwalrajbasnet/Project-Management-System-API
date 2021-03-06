exports.up = function (knex) {
  return knex.schema.createTable('task', (table) => {
    table.increments('task_id').primary();
    table.string('title', 130).notNullable();
    table.text('description');
    table.datetime('deadline');
    table.integer('project_id').notNullable();
    table.integer('assignee');
    table.integer('last_assignee');
    table.foreign('project_id').references('id').inTable('project');
    table.foreign('assignee').references('id').inTable('user');
    table.foreign('last_assignee').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('task');
};
