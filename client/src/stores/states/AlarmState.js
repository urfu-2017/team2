/* eslint-disable no-invalid-this */
import { action, observable } from 'mobx';
import moment from 'moment';

export default class AlarmState {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable moment = moment();
    @observable key = 0;
    @observable show = false;
    @observable top = 0;
    @observable left = 0;
    @observable messageId = null;
    @observable alarmMessage = null;

    // 362 x 478
    @action toggleAlarm = (x, y, messageId) => {
        this.top = y < 428 ? y + 20 : y - 428;
        this.left = x < 270 + 362 ? x : x - 362;

        if (this.messageId !== messageId) {
            this.show = true;
            this.messageId = messageId;
        } else {
            this.show = false;
            this.messageId = null;
        }
    };

    alarm(message) {
        this.alarmMessage = message;
    }

    close() {
        this.alarmMessage = null;
    }

    setTime(time) {
        this.key = Math.random();
        this.moment = time;
    }

    save() {
        this.dataStore.setAlarm(this.moment.unix(), this.messageId);

        this.messageId = null;
        this.show = false;
    }
}
