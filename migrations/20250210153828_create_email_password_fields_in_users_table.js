/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
   return knex.schema.alterTable('users', function (table) {
      table.string('email').notNullable().defaultTo("");
      table.string('password').notNullable().defaultTo("");
   });  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
   return knex.schema.alterTable('users', (table) => {
      table.dropColumn('email');
      table.dropColumn('password');
   });  
}
