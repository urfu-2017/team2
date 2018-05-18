/* eslint-disable complexity */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { observer, inject } from 'mobx-react';
import UserMessage from './UserMessage/index';
import ServiceMessage from './ServiceMessage/index';

@inject('state', 'dataStore') @observer
export default class ChatHistory extends Component {
    constructor(props) {
        super(props);

        this.topRef = null;
        this.bottomRef = null;
        this.firstMessage = null;
    }

    static propTypes = {
        state: PropTypes.object,
        dataStore: PropTypes.object,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ])
    };

    componentDidUpdate() {
        const { chatState } = this.props.state;
        if (chatState.scrollToEnd) {
            this.scrollDown();
            chatState.scrollToEnd = true;

            return;
        }
        if (chatState.toAnchor) {
            chatState.anchorMessage.scrollIntoView();
            chatState.toAnchor = false;

            return;
        }
        if (chatState.scrollPosition) {
            this.topRef.scrollTop = chatState.scrollPosition;
        }
    }

    componentDidMount() {
        this.scrollDown();
    }

    onScroll() {
        const { chatState } = this.props.state;
        chatState.scrollPosition = this.topRef.scrollTop;
        if (chatState.hasMore && this.topRef.scrollTop === 0) {
            chatState.anchorMessage = this.firstMessage.ref;
            chatState.toAnchor = true;
            chatState.loadMore();
        }
    }

    scrollDown() {
        if (this.bottomRef) {
            this.bottomRef.scrollIntoView();
        }
    }

    onDragStart(e) {
        e.preventDefault();
        this.props.state.chatPreviewState.isDropping = true;
    }

    onDragLeave(e) {
        e.preventDefault();
        this.props.state.chatPreviewState.isDropping = false;
    }

    onDrop(e) {
        e.preventDefault();
        this.props.state.chatPreviewState.change(e.dataTransfer.files);
        this.props.state.chatPreviewState.isDropping = false;
    }

    render() {
        const { chatState, chatListState } = this.props.state;
        const { dataStore } = this.props;
        const className = `${this.props.state.chatPreviewState.isDropping
            ? styles.Dropzone : styles.Wrapper}`;
        const classNameNight = `${this.props.state.chatPreviewState.isDropping
            ? styles.DropzoneNight : styles.WrapperNight}`;

        return (
            <div
                onScroll={this.onScroll.bind(this)}
                onDragOver={this.onDragStart.bind(this)}
                onDrop={this.onDrop.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
                className={ this.props.state.mainView.isNightTheme
                    ? className : classNameNight}
                ref={el => {
                    this.topRef = el;
                }}>
                <div className={styles.Supporter}/>
                {chatState.chatHistory.map((message, i) => message.isService
                    ? <ServiceMessage key={message._id} text={message.text}/>
                    : (
                        <UserMessage
                            key={message._id || message.tempId}
                            id={message._id}
                            fromMe={message.from === dataStore.profile._id}
                            isSent={Boolean(message._id)}
                            name={(!chatListState.currentChat.dialog &&
                                message.from !== dataStore.profile._id) ? message.fromLogin : ''}
                            body={message.body}
                            createdAt={message.createdAt}
                            attachments={message.attachments}
                            reactions={message.reactions || {}}
                            og={message.og}
                            ref={i === 0 ? el => {
                                if (el) {
                                    this.firstMessage = el.wrappedInstance;
                                }
                            } : null}/>
                    ))}
                <div ref={el => {
                    this.bottomRef = el;
                }}/>
            </div>
        );
    }
}
