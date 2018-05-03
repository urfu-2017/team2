'use strict';
/* eslint-env mocha */
/* eslint-disable max-len */

const assert = require('assert');
const openGraph = require('../app/tools/opengraph');

describe('Тестирование opengraph', () => {
    it('Начальная работоспособность', async () => {
        const url = 'http://ogp.me/';
        const expected = {
            data: {
                ogTitle: 'Open Graph protocol',
                ogType: 'website',
                ogUrl: 'http://ogp.me/',
                ogDescription: 'The Open Graph protocol enables any web page to become a rich object in a social graph.',
                ogImage: {
                    url: 'http://ogp.me/logo.png',
                    width: '300',
                    height: '300',
                    type: 'image/png'
                }
            },
            success: true,
            'requestUrl': 'http://ogp.me/'
        };
        const actual = await openGraph(url);
        assert.deepEqual(actual, expected);
    });

    it('Подлагивающие тренды ютуба', async () => {
        const url = 'https://www.youtube.com/feed/trending';
        const actual = await openGraph(url);
        const expected = {
            data:
                {
                    ogTitle: '  Trending\n - YouTube',
                    ogDescription: 'The pulse of what\'s trending on YouTube. Check out the latest music videos, trailers, comedy clips, and everything else that people are watching right now.',
                    ogImage: []
                },
            success: true,
            requestUrl: 'https://www.youtube.com/feed/trending'
        };
        assert.deepEqual(actual, expected);
    });
});
