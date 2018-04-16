import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import styles from './Chats.css';
import { observer } from 'mobx-react';
import ChatSearchResults from './ChatSearchResults/ChatSearchResults';
import SearchResult from './ChatSearchResults/SearchResult/SearchResult';

@observer
export default class Chats extends Component {

    static propTypes = {
        chats: PropTypes.observableArray,
        chatInput: ReactPropTypes.string,
        children: ReactPropTypes.array,
        addContact: ReactPropTypes.func,
        searchByLogin: ReactPropTypes.func,
        chooseOlesya: ReactPropTypes.func,
        searchResult: PropTypes.observableArray
    };

    constructor(props) {
        super(props);
        this.state = {
            chats: this.props.chats
        };
    }

    filteredList(event) {
        const res = this.props.chats.filter(chat => {
            return chat.name.toLowerCase().search(event.target.value) !== -1;
        });

        this.props.searchByLogin(event.target.value);

        this.setState({ chatInput: event.target.value });
        this.setState({ chats: res });
    }

    addContact(event) {
        event.preventDefault();
        this.props.addContact(this.state.chatInput);
        this.setState({ chatInput: '' });
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <div className={styles.Wrappers}>
                    <form onSubmit={this.addContact.bind(this)}>
                        <input placeholder="Search" className={styles.Input}
                            value={this.state.chatInput}
                            onChange={this.filteredList.bind(this)}/>
                    </form>
                    {this.props.children}
                    <div className={styles.Separator} />
                    <ChatSearchResults>
                        {this.props.searchResult &&
                        this.props.searchResult.map(result =>
                            <SearchResult
                                key={result.id}
                                login={result.login}
                                avatar={result.avatar}
                                onAdd={() => this.props.addContact(result.id)}/>
                        )}
                    </ChatSearchResults>
                </div>
            </div>
        );
    }
}
