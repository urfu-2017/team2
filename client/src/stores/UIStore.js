/* eslint-disable no-invalid-this */
import { observable, computed, action } from 'mobx';
import * as States from '../enum/LoadState';
import ChatInputState from './states/ChatInputState';
import ChatState from './states/ChatState';
import ChatListState from './states/ChatListState';

export default class UIStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.chatState = new ChatState(this.rootStore.dataStore);
        this.chatListState = new ChatListState(this.rootStore.dataStore);
        this.chatInputState = new ChatInputState(this, this.rootStore.dataStore);
    }

    @observable mainView = {
        showContacts: true,
        showChat: true,
        showProfile: false
    };

    @computed
    get loaderState() {
        return getLoaderState(this.rootStore.dataStore.loadingState);
    }

    @action setSearchResults = (searchResults) => {
        if (searchResults) {
            this.chatListState.searchResults = searchResults
                .filter(chat => chat.login !== this.rootStore.dataStore.profile.login);
        } else {
            this.chatListState.searchResults = [];
        }
    };
}

function getLoaderState(loadingState) {
    let loaderState;
    let message = '';

    if (loadingState === States.LOADED) {
        loaderState = false;
    }

    if (loadingState === States.LOAD_CONTACTS) {
        loaderState = true;
        message = 'Loading contacts';
    }

    if (loadingState === States.LOAD_PROFILE) {
        loaderState = true;
        message = 'Loading profile';
    }

    if (loadingState === States.ADD_CONTACT) {
        loaderState = true;
        message = 'Adding contact';
    }

    return { loaderState, message };
}
