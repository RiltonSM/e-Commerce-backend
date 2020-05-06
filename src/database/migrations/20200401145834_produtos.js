exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('valor').notNullable();
        table.string('valorAnt');
        table.boolean('promocao').notNullable();
        table.string('imagem').notNullable();
        table.integer('categoria').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
