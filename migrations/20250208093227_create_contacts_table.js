/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
   return knex.schema.createTable('contacts', table => {
      table.increments('id').primary();
      table.string('phone').notNullable();
   });  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
   return knex.schema.dropTable('contacts');  
}
