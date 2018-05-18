import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import styles from './index.css';
import { observer, inject } from 'mobx-react';

@inject('state') @observer
export default class ChatItem extends Component {
    constructor(props) {
        super(props);
    }

    static dayInterval = 1000 * 60 * 60 * 24;
    static weekInterval = 1000 * 60 * 60 * 24 * 7;
    static propTypes = {
        state: PropTypes.object,
        current: PropTypes.bool.isRequired,
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastMessage: PropTypes.string,
        lastMessageDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func.isRequired
    };

    static currentStyle = {
        backgroundColor: '#03a9f4',
        color: '#fffffa'
    };

    render() {
        return (
            <a style={this.props.current ? ChatItem.currentStyle : {}}
                className={this.props.state.mainView.isNightTheme
                    ? styles.Wrapper : styles.WrapperNight} onClick={this.props.onClick}>
                <Avatar src={this.props.photoURL} size={52} />
                <span className={styles.Name}>
                    {this.props.name}
                </span>
                <span className={styles.LastMessage}
                    dangerouslySetInnerHTML={{ __html: this.props.lastMessage }}/>
                <span className={styles.LastMessageDate}>
                    {this._formatDate(this.props.lastMessageDate)}
                </span>
            </a>
        );
    }

    _formatDate(createdAt) {
        if (!createdAt) {
            return;
        }

        createdAt = new Date(createdAt);

        if (Date.now() - createdAt.getTime() < ChatItem.dayInterval) {
            return createdAt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        } else if (Date.now() - createdAt.getTime() < this.weekInterval) {
            return createdAt.toLocaleDateString('ru-RU', { weekday: 'long' });
        }

        return createdAt.toLocaleDateString('ru-RU');
    }
}
