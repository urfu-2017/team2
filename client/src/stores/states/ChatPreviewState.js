/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';

export default class ChatPreviewState {
    constructor(dataStore) {
        this.dataStore = dataStore;
        this.FILE_AMOUNT_LIMIT = 10;
        this.FILE_SIZE_LIMIT = 7;
        this.FILE_FORMAT = ['image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
            'jpg',
            'jpeg',
            'gif',
            'png'
        ];
    }

    @observable error = '';

    @observable attachments = [];

    @observable uploadQueue = [];

    @observable isDropping = false;

    @action change = (files) => {
        if (files.length > this.FILE_AMOUNT_LIMIT ||
            this.attachments.length > this.FILE_AMOUNT_LIMIT) {
            this.error = `Only ${this.FILE_AMOUNT_LIMIT} files can be loaded at the time`;

            return;
        }
        let sizeSum = 0;
        Object.values(files).forEach(file => {
            sizeSum += file.size;
        });

        Object.values(files).forEach(file => {
            if (this.FILE_FORMAT.indexOf(file.type) === -1) {
                this.error = 'This file fomat isn`t supported';
            }

            return;
        });

        if (sizeSum >= this.FILE_SIZE_LIMIT * 1024 * 1024) {
            this.error = `Only ${this.FILE_SIZE_LIMIT}MB files can be loaded`;

            return;
        }

        Object.values(files).forEach(file => {
            this.uploadQueue.push(file);
            this.attachments.push('loading');
        });
        this.upload();
    };

    @action clearError = () => {
        this.error = '';
    };

    @action upload = () => {
        if (this.uploadQueue.length > 0) {
            this.dataStore.uploadImage(this.uploadQueue[0]);
        }
    };

    @action addAttachment = (attachment) => {
        this.uploadQueue.splice(0, 1);
        this.attachments[(this.attachments.length - this.uploadQueue.length) - 1] = attachment;
        this.upload();
    };

    @action remove = (index) => {
        this.attachments.splice(index, 1);
    };
}
