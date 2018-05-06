'use strict';
const path = require('path');

module.exports = {
    debug: true,
    host: 'http://localhost:8080',
    port: 8080,
    staticPath: '/',
    clientFiles: path.join(__dirname, '../../client/dist'),
    clientHost: 'http://localhost:8080'
};
