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
import Popup from 'reactjs-popup';
import AlarmSound from './alarm.mp3';
import Sound from 'react-sound';

@inject('rootStore') @observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        rootStore: ReactPropTypes.object
    };

    defaultStyleOverride = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px'
    };

    render() {
        const { dataStore, state } = this.props.rootStore;
        const {
            chatState,
            chatListState,
            chatInputState,
            chatPreviewState,
            reactionSelectorState,
            chatCreateState,
            alarmState
        } = state;

        const chatList = chatListState.chatsToDisplay.map(chat => (
            <ChatItem key={chat._id}
                current={chat._id === chatState.currentChat._id}
                photoURL={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage.body}
                lastMessageDate={chat.lastMessage.createdAt}
                onClick={chatState.selectChat.bind(chatState, chat)}/>
        ));

        const chatHistory = chatState.currentChatHistory.map(message => message.isService
            ? <ServiceMessage key={message._id} text={message.text}/>
            : (
                <UserMessage
                    key={message._id || message.tempId}
                    id={message._id}
                    fromMe={message.from === dataStore.profile._id}
                    isSent={Boolean(message._id)}
                    name={(!chatState.currentChat.dialog &&
                        message.from !== dataStore.profile._id) ? message.fromLogin : ''}
                    body={message.body}
                    createdAt={message.createdAt}
                    attachments={message.attachments}
                    reactions={message.reactions || {}}
                    og={message.og}/>
            ));

        const { loaderState, message } = state.loaderState;

        return (
            <Provider chatInputState={chatInputState}
                state={state}
                chatListState={chatListState}
                chatPreviewState={chatPreviewState}
                chatState={chatState}
                reactionSelectorState={reactionSelectorState}
                chatCreateState={chatCreateState}
                alarmState={alarmState}
            >
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
                            avatar={chatState.currentChat.avatar}
                            inviteLink={chatState.currentChat.inviteLink}>
                            {chatHistory}
                        </Chat>
                        : <div className={styles.StubWrapper}
                            onClick={state.closeProfile.bind(state)}>
                            <ServiceMessage text="Please select a chat to start messaging"/>
                        </div>}
                    {state.mainView.showProfile &&
                    <Profile
                        closeProfile={state.closeProfile.bind(state)}
                        profile={dataStore.profile}/>}
                    <Sound
                        url={`${process.env.STATIC}/${AlarmSound}`}
                        playStatus={
                            alarmState.alarmMessage !== null
                                ? Sound.status.PLAYING
                                : Sound.status.STOPPED
                        }
                        loop={true}
                    />
                    <Popup
                        open={alarmState.alarmMessage !== null}
                        modal
                        closeOnDocumentClick={false}
                        closeOnEscape={false}
                        contentStyle={this.defaultStyleOverride}
                    >
                        {close => (
                            <div className={styles.PopupContainer}>
                                <span className={styles.PopupUserInfo}>
                            Alarm!
                                </span>
                                <span className={styles.PopupClose} onClick={() => {
                                    close();
                                    alarmState.close();
                                }}>
                            ❌
                                </span>
                                <span
                                    className={styles.PopupContent}
                                    dangerouslySetInnerHTML={{
                                        __html: alarmState.alarmMessage.body
                                    }}
                                >
                                </span>
                            </div>
                        )}
                    </Popup>
                </div>
            </Provider>
        );
    }
}
