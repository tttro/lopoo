
exports.up = function(knex, Promise) {
    return knex
    .schema
    .createTableIfNotExists('users', function( usersTable ) {
        // Primary Key
        usersTable.increments('user_id').primary();

        // Data
        usersTable.string( 'username', 50 ).notNullable().unique();
        usersTable.timestamp( 'created_at' ).defaultTo(knex.fn.now());
    })
    .createTableIfNotExists('secrets', function( secretsTable ){
        secretsTable.integer('user_id')
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
            .primary();
        secretsTable.text('password').notNullable();
    })
    .createTableIfNotExists('logs', function name(fuellogTable) {
        fuellogTable.increments('log_id');
        fuellogTable.integer('mileage').notNullable();
        fuellogTable.decimal('liters').notNullable();
        fuellogTable.decimal('price').notNullable();
        fuellogTable.timestamp( 'created_at' ).defaultTo(knex.fn.now());
        fuellogTable.integer('user_id')
            .unsigned()
            .notNull()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE');
    }); 
};

exports.down = function(knex, Promise) {
    return knex
    .schema
        .dropTableIfExists('logs')
        .dropTableIfExists('secrets')
        .dropTableIfExists('users');
};
