/* eslint-disable no-invalid-this */
import { action, observable } from 'mobx';

export default class ReactionSelectorState {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable show = false;
    @observable top = 0;
    @observable left = 0;
    @observable messageId = null;

    @action toggleReactionSelector = (x, y, messageId) => {
        this.top = y < 333 ? y + 20 : y - 333;
        this.left = x < 270 + 287 ? x : x - 287;

        if (this.messageId !== messageId) {
            this.show = true;
            this.messageId = messageId;
        } else {
            this.show = false;
            this.messageId = null;
        }
    };

    sendReaction(code) {
        this.dataStore.sendReaction(code, this.messageId);
        this.messageId = null;
        this.show = false;
    }
}
