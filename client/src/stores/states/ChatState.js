/* eslint-disable no-invalid-this */
import { computed, action, observable } from 'mobx';
import ChatInputState from './ChatInputState';

export default class ChatState {

    constructor(dataStore, chatId) {
        this.dataStore = dataStore;
        this.chatId = chatId;
        this.inputState = new ChatInputState(dataStore, chatId, this);
        this.loadCount = 0;
        this.MESSAGES_LIMIT = 50;
        this.profileId = dataStore.profile._id;
        this.anchorMessage = null;
        this.toAnchor = false;
        this.scrollToEnd = true;
        this.scrollPosition = null;
    }

    @computed
    get chatHistory() {
        const chatHistory = this.dataStore.chatHistories.get(this.chatId);

        return chatHistory ? chatHistory.messages : [];
    }

    @observable fullSizeImg = false;
    @observable file = '';

    @action changeFullSizeImg = () => {
        this.fullSizeImg = false;
    };

    @computed
    get attachments() {
        return this.inputState.previewState.attachments;
    }

    @computed
    get previewState() {
        return this.inputState.previewState;
    }

    @action addAttachment = (attachment) => {
        this.inputState.previewState.addAttachment(attachment);
    };

    @action loadMore = () => {
        this.scrollToEnd = false;
        this.dataStore.loadMoreMessages(this.chatId,
            ++this.loadCount * this.MESSAGES_LIMIT,
            this.MESSAGES_LIMIT);
    };

    @computed
    get totalCount() {
        return this.dataStore.chatHistories.get(this.chatId).totalCount;
    }

    @computed
    get hasMore() {
        return this.totalCount > (this.loadCount + 1) * this.MESSAGES_LIMIT;
    }
}
