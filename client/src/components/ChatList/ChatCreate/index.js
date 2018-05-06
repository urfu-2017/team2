import React, { Component, Fragment } from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import Contact from '../../Contact';
import styles from './index.css';

@inject('chatCreateState', 'chatListState') @observer
export default class ChatCreate extends Component {

    static propTypes = {
        chatCreateState: PropTypes.observableObject,
        chatListState: PropTypes.observableObject
    };

    constructor(props) {
        super(props);
        this.props.chatCreateState.dataStore.getContactList();
    }

    contactClickHandler(event, contact) {
        this.props.chatCreateState.toggleContactForChat(contact);
    }

    buttonClickHandler() {
        this.props.chatCreateState.createChat();
        this.props.chatListState.toggleCreating();
    }

    render() {
        const contacts = this.props.chatCreateState.dataStore.contactList.map(contact => <Contact
            key={contact._id}
            login={contact.login}
            avatar={contact.avatar}
            withCheckbox={true}
            onClick={ev => this.contactClickHandler.bind(this, ev, contact)()}
            isChecked={this.props.chatCreateState.getIndex(contact) !== -1}/>);

        const disabled = this.props.chatCreateState.selectedContacts.length
            ? ''
            : { disabled: 'disabled' };

        return (
            <Fragment>
                <div className={styles.ContactList}>
                    {contacts}
                </div>
                <button type="button" className={styles.Button}
                    onClick={this.buttonClickHandler.bind(this)}
                    {...disabled}>Create chat
                </button>
            </Fragment>
        );
    }
}
