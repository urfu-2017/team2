/* eslint-disable no-invalid-this */
import { observable, computed, action, autorun } from 'mobx';
import * as States from '../enum/LoadState';
import ChatInputState from './states/ChatInputState';
import ChatState from './states/ChatState';
import ChatListState from './states/ChatListState';
import ChatPreviewState from './states/ChatPreviewState';
import ReactionSelectorState from './states/ReactionSelectorState';
import ChatCreateState from './states/ChatCreateState';
import AlarmState from './states/AlarmState';

export default class UIStore {

    constructor(dataStore) {
        this.dataStore = dataStore;
        this.chatState = new ChatState(this.dataStore);
        this.chatListState = new ChatListState(this.dataStore);
        this.chatCreateState = new ChatCreateState(this.dataStore);
        this.chatPreviewState = new ChatPreviewState(this.dataStore);
        this.chatInputState =
            new ChatInputState(this, this.dataStore, this.chatPreviewState);
        this.reactionSelectorState = new ReactionSelectorState(this.dataStore);
        this.alarmState = new AlarmState(this.dataStore);

        autorun(() => {
            if (this.dataStore.profile.avatar) {
                this.loadAvatar = false;
            }
        });
    }

    @observable loadAvatar = false;

    @observable mainView = {
        showContacts: true,
        showChat: true,
        showProfile: false
    };

    @computed
    get loaderState() {
        return getLoaderState(this.dataStore.loadingState);
    }

    @computed
    get profile() {
        return this.dataStore.profile;
    }

    @action uploadAvatar = (file) => {
        this.loadAvatar = true;
        this.dataStore.uploadAvatar(file);
    };

    @action toggleProfile = () => {
        this.mainView.showProfile = !this.mainView.showProfile;
    };

    @action showProfile = () => {
        this.mainView.showProfile = true;
    };

    @action closeProfile = () => {
        this.mainView.showProfile = false;
    };

    @action addAttachment = (attachment) => {
        this.chatPreviewState.addAttachment(attachment);
    };

    @action setSearchResults = (searchResults) => {
        if (searchResults) {
            this.chatListState.searchResults = searchResults
                .filter(chat => chat.login !== this.dataStore.profile.login);
        } else {
            this.chatListState.searchResults = [];
        }
    };
}

function getLoaderState(loadingState) {
    let loaderState;
    let message = '';

    switch (loadingState) {
        case States.LOADED:
            loaderState = false;
            break;
        case States.LOAD_CONTACTS:
            loaderState = true;
            message = 'Loading contacts';
            break;
        case States.LOAD_PROFILE:
            loaderState = true;
            message = 'Loading profile';
            break;
        case States.ADD_CONTACT:
            loaderState = true;
            message = 'Adding contact';
            break;
        case States.ADD_CHAT:
            loaderState = true;
            message = 'Creating chat';
            break;
        default:
            break;
    }

    return { loaderState, message };
}
