'use strict';

const { error404 } = require('./controllers/errors');
const auth = require('./controllers/auth');

module.exports = app => {
    auth(app);
    app.all('*', error404);
};
