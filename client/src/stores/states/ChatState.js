/* eslint-disable no-invalid-this */
import { observable, action, computed } from 'mobx';

export default class ChatState {

    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable currentChat = {};

    @computed
    get currentChatHistory() {
        const chatHistory = this.dataStore.chatHistories.get(this.currentChat._id);

        return chatHistory ? chatHistory : [];
    }

    @action selectChat = (chat) => {
        this.currentChat = chat;
    };
}
