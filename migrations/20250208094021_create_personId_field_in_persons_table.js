/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
   return knex.schema.alterTable('contacts', function (table) {
      table.integer("personId").unsigned().notNullable();
      table.foreign('personId').references('persons.id');
   });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
   return knex.schema.alterTable('contacts', (table) => {
      table.dropColumn('personId');
   });
}
