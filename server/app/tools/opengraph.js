'use strict';

const scrap = require('open-graph-scraper');

module.exports = async url => {
    const options = { 'url': url, 'timeout': 10000 };

    return scrap(options);
};
