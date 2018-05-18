import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import styles from './index.css';
import EmojiPicker from 'emoji-picker-react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('state') @observer
export default class ChatEmojiPicker extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        state: PropTypes.observableObject,
        onEmojiClick: ReactPropTypes.func,
        onMouseLeave: ReactPropTypes.func
    };


    render() {
        return (
            <div className={this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}
            onMouseLeave={this.props.onMouseLeave}>
                <EmojiPicker onEmojiClick={this.props.onEmojiClick}/>
            </div>
        );
    }
}
