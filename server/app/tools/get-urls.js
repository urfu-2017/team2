'use strict';

const URL_REGEX = /(?:(http|https):\/\/)?([\da-z.-]+\.[a-z.]{2,6})((?:\/[\w.-]*)*)?/ig;

module.exports = message => {
    return message.match(URL_REGEX);
};

