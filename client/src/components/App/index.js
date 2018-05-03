import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import ChatList from '../ChatList';
import Profile from '../Profile';
import Chat from '../Chat';
import ServiceMessage from '../Chat/ChatHistory/ServiceMessage';
import styles from './index.css';
import ChatItem from '../ChatList/ChatItem/index';
import UserMessage from '../Chat/ChatHistory/UserMessage/index';

@inject('rootStore') @observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        rootStore: ReactPropTypes.object
    };

    render() {
        const { dataStore, state } = this.props.rootStore;
        const { chatState, chatListState, chatInputState } = state;

        const chatList = chatListState.chatsToDisplay.map(chat => (
            <ChatItem key={chat._id}
                current={chat._id === chatState.currentChat._id}
                photoURL={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage.body}
                lastMessageDate={chat.lastMessage.createdAt}
                onClick={chatState.selectChat.bind(chatState, chat)}/>
        ));

        const chatHistory = chatState.currentChatHistory.map(message => (
            <UserMessage key={message._id || message.tempId}
                fromMe={message.from === dataStore.profile._id}
                isSent={Boolean(message._id)}
                name={message.name}
                body={message.body}
                createdAt={message.createdAt}
                og={message.og}/>
        ));

        const { loaderState, message } = state.loaderState;

        return (
            <Provider chatInputState={chatInputState}
                chatListState={chatListState}
                chatState={chatState}>
                <div className={styles.Wrapper}>
                    <div className={styles.LoadingScreen}
                        style={{ display: loaderState ? 'flex' : 'none' }}>
                        <div className={styles.LoaderWrapper}>
                            <div className={styles.Loader}/>
                        </div>
                        <div className={styles.LoaderText}>{message}</div>
                    </div>
                    {state.mainView.showContacts &&
                    <ChatList>
                        {chatList}
                    </ChatList>}
                    {chatState.currentChat.name
                        ? <Chat name={chatState.currentChat.name}
                            avatar={chatState.currentChat.avatar}>
                            {chatHistory}
                        </Chat>
                        : <div className={styles.StubWrapper}>
                            <ServiceMessage text="Please select a chat to start messaging"/>
                        </div>
                    }
                    {state.mainView.showProfile &&
                    <Profile profile={dataStore.profile}/>}
                </div>
            </Provider>
        );
    }
}

