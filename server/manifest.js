'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
        debug: {
            $filter: 'NODE_ENV',
            development: {
                log: ['error', 'implementation', 'internal'],
                request: ['error', 'implementation', 'internal']
            },
            // add by me
            production: {
                log: ['internal'],
                request: ['internal']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: './plugins/swagger'
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            /*client: 'sqlite3',
                            useNullAsDefault: true,         // Suggested for sqlite3
                            pool: {
                                idleTimeoutMillis: Infinity // Handles knex v0.12/0.13 misconfiguration when using sqlite3 (tgriesser/knex#1701)
                            },
                            connection: {
                                filename: ':memory:'
                            }*/
                            client: 'mysql',
                            connection: {
                              database: 'boilerplate-api',
                              host: 'localhost',
                              port: 3306,
                              user: 'root',
                              password: '1234@Abcd',
                            },
                            pool: {
                              min: 2,
                              max: 10
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            }
        ]
    }
});
