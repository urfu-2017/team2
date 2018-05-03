import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Contact from '../Contact';
import styles from './index.css';

@inject('chatListState') @observer
export default class ChatList extends Component {

    static propTypes = {
        chatListState: PropTypes.observableObject,
        children: ReactPropTypes.array
    };

    constructor(props) {
        super(props);
    }

    changeHandler(event) {
        this.props.chatListState.change(event.target.value);
    }

    render() {
        const { chatListState } = this.props;

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
                    <form className={styles.SearchForm}>
                        <input placeholder="Search"
                            className={styles.SearchInput}
                            value={chatListState.chatInput}
                            onChange={this.changeHandler.bind(this)}/>
                    </form>
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
            </div>
        );
    }
}
