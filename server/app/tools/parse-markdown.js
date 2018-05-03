'use strict';

const pagedown = require('pagedown');
const saneConv = pagedown.getSanitizingConverter();

module.exports = message => saneConv.makeHtml(message);

