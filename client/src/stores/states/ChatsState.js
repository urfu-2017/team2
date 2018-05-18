/* eslint-disable no-invalid-this */
import { observable, action, computed, autorun } from 'mobx';
import ChatState from './ChatState';

export default class ChatsState {
    constructor(dataStore, state, chatListState) {
        this.dataStore = dataStore;
        this.chatListState = chatListState;
        this.state = state;

        autorun(() => {
            this.dataStore.chatList.forEach(chat => {
                if (chat && !this.chatStates.has(chat._id)) {
                    this.chatStates.set(chat._id,
                        new ChatState(this.dataStore, chat._id));
                }
            });
        });
    }

    @observable chatStates = new Map();

    @computed
    get chatState() {
        return this.chatStates.get(this.chatListState.currentChat._id);
    }

    @computed
    get chatInputState() {
        return this.chatStates.get(this.chatListState.currentChat._id).inputState;
    }

    @computed
    get chatPreviewState() {
        return this.chatStates.get(this.chatListState.currentChat._id).previewState;
    }

    @action addAttachment = (attachment) => {
        this.chatStates.get(this.chatListState.currentChat._id)
            .addAttachment(attachment);
    };
}
