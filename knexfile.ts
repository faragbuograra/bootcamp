import 'dotenv/config'
import Knex from "knex"
import {DB} from "./src/config"

const config = {
    client: DB.client,
    connection: {
        host: DB.host,
        user: DB.user,
        password: DB.password,
        database: DB.database
    },
    searchPath: ['public'],
    pool: {
        min: 0,
        max: 100
    },
    migrations: {
        tableName: 'migrations',
        directory: "Database/Migrations",
        stub: 'Database/migration.stub'
    },
    seeds: {
        directory: "Database/Seeders",
        timestampFilenamePrefix: true
    }
}

export const knex = Knex(config)
export default config
