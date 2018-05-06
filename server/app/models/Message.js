'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.ObjectId, ref: 'User' },
    fromLogin: { type: String },
    chatId: { type: mongoose.Schema.ObjectId, ref: 'Chat' },
    body: String,
    og: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    reactions: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    attachments: []
});

module.exports = mongoose.model('Message', messageSchema);
