/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
   return knex.schema
      // First rename the table
      .renameTable('persons', 'users')
      // Then update the foreign key in the related table
      .alterTable('contacts', function (table) {
         // Drop the existing foreign key constraint
         table.dropForeign('personId');

         // Rename the column
         table.renameColumn('personId', 'userId');

         // Add the foreign key constraint back with the new name
         table.foreign('userId')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
   return knex.schema
      // First drop the foreign key in the related table
      .alterTable('contacts', function (table) {
         // Drop the new foreign key constraint
         table.dropForeign('userId');

         // Rename the column back
         table.renameColumn('userId', 'personId');

         // Add the original foreign key constraint back
         table.foreign('personId')
            .references('id')
            .inTable('persons')
            .onDelete('CASCADE');
      })
      // Then rename the table back
      .renameTable('users', 'persons');
}
