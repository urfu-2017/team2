import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Contact from '../Contact';
import ChatCreate from './ChatCreate';
import styles from './index.css';
import Avatar from '../Contact/Avatar';

@inject('chatListState', 'state') @observer
export default class ChatList extends Component {

    static propTypes = {
        chatListState: PropTypes.observableObject,
        state: PropTypes.observableObject,
        children: ReactPropTypes.array
    };

    constructor(props) {
        super(props);
    }

    changeHandler(event) {
        this.props.chatListState.change(event.target.value);
    }

    chatCreateHandler() {
        this.props.chatListState.toggleCreating();
    }

    render() {
        const { chatListState, state } = this.props;

        const searchResults = chatListState.searchResultsToDisplay.map(chat =>
            <Contact
                key={chat._id}
                login={chat.login}
                avatar={chat.avatar}
                withCheckbox={false}
                onClick={chatListState.addContact.bind(chatListState, chat.login)}/>
        );

        return (
            <div className={styles.Wrapper}>
                <div className={styles.Wrappers}>
                    <div className={styles.TopRow}>
                        <div className={styles.Profile}
                            onClick={state.toggleProfile.bind(state)}>
                            <Avatar src={state.profile.avatar} size={30}/>
                        </div>
                        <form className={styles.SearchForm}>
                            <input placeholder="Search"
                                className={styles.SearchInput}
                                value={chatListState.chatInput}
                                onChange={this.changeHandler.bind(this)}/>
                        </form>
                        <button type="button"
                            className={`${styles.CreateChatBtn} ${styles.Button}
                            ${chatListState.isCreatingChat ? styles.CreateChatActive : ''}`}
                            onClick={this.chatCreateHandler.bind(this)}>
                            <i className={`material-icons ${styles.CreateChatIcon}`}>add</i>
                        </button>
                    </div>
                    {chatListState.isCreatingChat ? <ChatCreate/>
                        : <div>
                            {this.props.children}
                            {searchResults.length !== 0 &&
                            <div className={styles.GlobalSearchSeparator}>
                                <span className={styles.GlobalSearchHeader}>
                            Global search results
                                </span>
                            </div>
                            }
                            {searchResults}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
