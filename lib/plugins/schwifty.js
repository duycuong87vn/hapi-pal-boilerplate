'use strict';
console.log(`${__dirname}/../migrations`)
module.exports = {
    plugins: {
        options: {
            migrationsDir: `${__dirname}/../migrations`
        }
    }
};
