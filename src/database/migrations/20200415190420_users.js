
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table){
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('cpf').notNullable();
    table.string('cep').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('complement');
    table.string('district').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.integer('ddd').notNullable();
    table.string('phone').notNullable();
    table.json('purchases');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
