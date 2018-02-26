'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // Custom plugin code can go here
        console.log('index.js')
        await HauteCouture.using()(server, options);
    }
};
