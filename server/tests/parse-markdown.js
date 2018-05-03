'use strict';
/* eslint-env mocha */

const assert = require('assert');
const parseMarkdown = require('../app/tools/parse-markdown');

describe('Тестирование микроразметки', () => {
    it('Создает микроразметку для текущей строки', () => {
        const message = '**tut** _budet_ message';
        const result = '<p><strong>tut</strong> <em>budet</em> message</p>';
        assert.equal(parseMarkdown(message), result);
    });

    it('Создает оборачивает в тег <code>', () => {
        const message = 'this is `source code`';
        const result = '<p>this is <code>source code</code></p>';
        assert.equal(parseMarkdown(message), result);
    });

    it('Создает оборачивает в тег <strong>', () => {
        const message = 'this is **bold**';
        const result = '<p>this is <strong>bold</strong></p>';
        assert.equal(parseMarkdown(message), result);
    });

    it('Создает оборачивает в тег <em>', () => {
        const message = 'this is _emph_';
        const result = '<p>this is <em>emph</em></p>';
        assert.equal(parseMarkdown(message), result);
    });
});
