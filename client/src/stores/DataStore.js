/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';
import * as States from '../enum/LoadState';
import { v4 as uuid } from 'uuid';

export default class DataStore {

    constructor(rootStore, webWorker) {
        this.webWorker = webWorker;
        this.rootStore = rootStore;
        this.loadProfile();

        this._messagesForSend = {};
    }

    @observable loadingState = States.LOADED;

    @observable profile = {};

    @observable chatList = [];

    @observable chatHistories = new Map();

    @action setChatHistory = (chatId, messages) => {
        const chatHistory = this.chatHistories.get(chatId);
        if (chatHistory) {
            chatHistory.unshift(...messages);
        } else {
            this.chatHistories.set(chatId, messages);
        }
    };

    @action setLoadingState = (state) => {
        this.loadingState = state;
    };

    @action setProfile = (profile) => {
        this.profile = profile;
    };

    @action addChats = (chats) => {
        this.chatList.push(...chats.map(initChat.bind(this)));
        chats.forEach(chat => {
            if (!this.chatHistories.has(chat._id)) {
                this.chatHistories.set(chat._id, []);
            }
        });
    };

    @action addMessage = (message) => {
        this.chatHistories.get(message.chatId).push(message);
    };

    @action addContact = (userId) => {
        this.loadingState = States.ADD_CONTACT;
        this.webWorker.addContact(userId);
    };

    @action sendMessage = ({ text, chatId }) => {
        const tempId = uuid();
        const messageForStore = {
            body: text,
            from: this.profile._id,
            createdAt: Date.now(),
            chatId,
            tempId
        };
        this.chatHistories.get(chatId).push(messageForStore);
        this._setSendMessageTimeout(messageForStore);
        this._dumpMessagesForSend();
    };

    @action messageDidSent = (message) => {
        clearTimeout(this._messagesForSend[message.tempId].timeout);
        delete this._messagesForSend[message.tempId];
        this._dumpMessagesForSend();

        const index = this.chatHistories
            .get(message.chatId)
            .findIndex(msg => msg.tempId === message.tempId);

        if (index !== -1) {
            this.chatHistories.get(message.chatId)[index] = message;
        }
    };

    @action searchByLogin = (userId) => {
        this.loadingState = States.SEARCH_CONTACTS;
        this.webWorker.searchByLogin(userId);
    };

    @action loadChatList = () => {
        this.loadingState = States.LOAD_CONTACTS;
        this.webWorker.getChatList();
    };

    @action loadProfile = () => {
        this.loadingState = States.LOAD_PROFILE;
        this.webWorker.getProfile();
    };

    getLastChatMessage(chat) {
        const chatHistory = this.chatHistories.get(chat._id);

        if (!(chatHistory && chatHistory[chatHistory.length - 1])) {
            return '';
        }

        return chatHistory[chatHistory.length - 1];
    }

    restoreMessagesForSend() {
        const messages = JSON.parse(localStorage.getItem('messagesForSend'));

        if (messages) {
            messages.forEach(message => {
                this._setSendMessageTimeout(message);

                if (!this.chatHistories.has(message.chatId)) {
                    this.chatHistories.set(message.chatId, []);
                }

                this.chatHistories.get(message.chatId).push(message);
            });
        }
    }

    _setSendMessageTimeout(messageData) {
        this.webWorker.sendMessage({
            text: messageData.body,
            chatId: messageData.chatId,
            tempId: messageData.tempId
        });

        this._messagesForSend[messageData.tempId] = {
            messageData,
            timeout: setTimeout(() => {
                this._setSendMessageTimeout(messageData);
            }, 5 * 1000)
        };
    }

    _dumpMessagesForSend() {
        const data = Object
            .keys(this._messagesForSend)
            .map(key => this._messagesForSend[key].messageData);

        localStorage.setItem('messagesForSend', JSON.stringify(data));
    }

}

function initChat(chat) {
    if (!chat) {
        return;
    }
    const user = chat.users.find(entry => entry._id !== this.profile._id);

    if (!user) {
        return;
    }

    chat.avatar = user.avatar;
    chat.name = user.login;

    return chat;
}
