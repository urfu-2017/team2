'use strict';

const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    messageId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Message'
    },
    time: Number,
    delta: Number
});

module.exports = mongoose.model('Alarm', alarmSchema);
