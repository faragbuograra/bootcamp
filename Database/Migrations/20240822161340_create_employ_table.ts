import { Knex } from "knex";

const table_name = 'employ'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.increments('id').primary()
        table.integer('number').unique().notNullable()
        table.string('name').notNullable()

        table.string('type').nullable()

        table.boolean('status').defaultTo(true).notNullable()


        table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

