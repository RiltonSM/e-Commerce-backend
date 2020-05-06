exports.up = function(knex) {
    return knex.schema.createTable('sales', function (table) {
        table.increments('id');
        table.string('userId').notNullable();
        table.string('userHash').notNullable();
        table.json('products').notNullable();
        table.json('quantity').notNullable();
        table.string('code');
        table.float('total').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};
