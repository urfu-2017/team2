/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';
import { emojiIndex } from 'emoji-mart';

export default class ChatInputState {

    constructor(state, dataStore, previewState) {
        this.state = state;
        this.dataStore = dataStore;
        this.previewState = previewState;
    }

    @observable chatInput = '';
    @observable showEmojiList = false;

    @action toggleEmojiList = () => {
        this.showEmojiList = !this.showEmojiList;
    };

    @action change = (inputText) => {
        this.chatInput = inputText;
    };

    @action submit = () => {
        if (!this.chatInput && this.previewState.attachments.length <= 0) {
            return;
        }

        if (this.previewState.uploadQueue.length > 0) {
            this.previewState.error = 'Wait until all files are loaded';

            return;
        }
        this.dataStore.sendMessage({
            chatId: this.state.chatState.currentChat._id,
            text: this.chatInput,
            attachments: this.previewState.attachments.slice()
        });

        this.previewState.attachments = [];
        this.chatInput = '';
    };

    findEmoji = id => emojiIndex.search(id)
        .filter(x => x.id === id)
        .map(x => x.native);

    addEmojiIntoText(_, emojiValue) {
        this.chatInput += `${this.findEmoji(emojiValue.name)}`;
    }
}
