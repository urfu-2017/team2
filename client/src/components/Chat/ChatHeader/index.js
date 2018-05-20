import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import Profile from '../../Profile';
import styles from './index.css';
import Popup from 'reactjs-popup';
import { observer, inject } from 'mobx-react';

@inject('state') @observer
export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }

    defaultStyleOverride = {
        width: 'auto',
        border: '0',
        background: 'transparent',
        padding: '0',
        'borderRadius': '4px'
    };

    defaultStyleOverrideNight = {
        width: 'auto',
        padding: '0',
        'borderRadius': '4px',
        background: 'transparent',
        color: 'white'
    };

    static propTypes = {
        state: PropTypes.object,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        inviteLink: PropTypes.string,
        dialog: PropTypes.bool
    };

    titleClickHandler() {
        if (this.props.dialog) {
            return;
        }
        // change the state so that input is visible
    }

    titleRenameHandler() {
        // call worker to submit new name
        // toggle editing state
    }

    cancelEditing() {
        // discard changes
        // toggle editing state
    }

    leaveHandler() {
        // call method to leave chat and redirect to stub
    }

    render() {
        return (
            <div className={!this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}>
                <button form="send-message-form" type="button"
                    className={this.props.state.mainView.isNightTheme
                        ? styles.BackButton : styles.BackButtonNight}
                    onClick={() => this.props.state.chatListState.closeChat()}>
                    <i className="material-icons">arrow_back_ios</i>
                </button>
                <Avatar src={this.props.avatar} size={48}/>
                <Popup
                    className={styles.Popup}
                    trigger={
                        <a className={styles.Info}>
                            <span className={styles.Name}>
                                {this.props.name}
                            </span>
                        </a>
                    }
                    modal
                    closeOnEscape
                    contentStyle={this.props.state.mainView.isNightTheme
                        ? this.defaultStyleOverride : this.defaultStyleOverrideNight}
                    closeOnDocumentClick
                >
                    {close => (
                        <Profile
                            profile={{
                                avatar: this.props.avatar,
                                login: this.props.name,
                                link: this.props.dialog
                                    ? undefined
                                    : this.props.inviteLink
                            }}
                            close={close}/>
                    )}
                </Popup>
            </div>
        );
    }
}
