/* eslint-disable no-invalid-this */
import { observable, action, computed } from 'mobx';

export default class ChatListState {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable chatInput = '';
    @observable searchResults = [];
    @observable isCreating = false;

    @action change = (inputText) => {
        this.chatInput = inputText;
        this.dataStore.searchByLogin(this.chatInput);
    };

    @action addContact = (login) => {
        this.dataStore.addContact(this.searchResults
            .find(chat => chat.login === login)._id);

        this.searchResults = this.searchResults
            .filter(chat => chat.login !== login);
    };

    @action toggleCreating = () => {
        this.isCreating = !this.isCreating;
    };


    @computed
    get searchResultsToDisplay() {
        return this.searchResults ? this.searchResults : [];
    }

    @computed
    get chatsToDisplay() {
        return this.dataStore.chatList.filter(chat => {
            return chat.name.toLowerCase()
                .indexOf(this.chatInput.toLowerCase()) !== -1;
        }).map(chat => {
            chat.lastMessage = this.dataStore.getLastChatMessage(chat);

            return chat;
        });
    }

    @computed
    get isCreatingChat() {
        return this.isCreating;
    }

}
