import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import styles from './index.css';
import Popup from 'reactjs-popup';

export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }

    defaultStyleOverride = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px'
    };

    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string
    };

    render() {
        return (
            <Popup
                trigger={<div className={styles.Wrapper}>
                    <Avatar src={this.props.avatar} size={48} />
                    <a className={styles.Info}>
                        <span className={styles.Name}>
                            {this.props.name}
                        </span>
                        <span className={styles.Status}>
                            {this.props.status}
                        </span>
                    </a>
                </div>
                }
                modal
                closeOnEscape
                contentStyle={this.defaultStyleOverride}
                closeOnDocumentClick
            >
                {close => (
                    <div className={styles.PopupContainer}>
                        <span className={styles.PopupUserInfo}>
                            User Info
                        </span>
                        <span className={styles.PopupClose} onClick={close}>
                            ❌
                        </span>
                        <Avatar className={styles.PopupAvatar} src={this.props.avatar} size={70} />
                        <span className={styles.PopupName}>
                            {this.props.name}
                        </span>
                        <span className={styles.PopupStatus}>
                            {this.props.status}
                        </span>
                    </div>
                )}
            </Popup>
        );
    }
}


