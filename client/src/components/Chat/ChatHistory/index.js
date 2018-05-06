/* eslint-disable no-invalid-this*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { observer, inject } from 'mobx-react';

@inject('chatPreviewState') @observer
export default class ChatHistory extends Component {
    constructor(props) {
        super(props);

        this.divRef = null;
    }

    static propTypes = {
        chatPreviewState: PropTypes.object,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ])
    };

    componentDidUpdate() {
        this.scrollDown();
    }

    componentDidMount() {
        this.scrollDown();
    }

    scrollDown() {
        if (this.divRef) {
            this.divRef.scrollTop = this.divRef.scrollHeight;
        }
    }

    onDragStart(e) {
        e.preventDefault();
        this.props.chatPreviewState.isDropping = true;
    }

    onDragLeave(e) {
        e.preventDefault();
        this.props.chatPreviewState.isDropping = false;
    }

    onDrop(e) {
        e.preventDefault();
        this.props.chatPreviewState.change(e.dataTransfer.files);
        this.props.chatPreviewState.isDropping = false;
    }

    render() {
        return (
            <div
                onDragOver={this.onDragStart.bind(this.onDragStart)}
                onDrop={this.onDrop.bind(this.onDrop)}
                onDragLeave={this.onDragLeave.bind(this.onDragLeave)}
                className={this.props.chatPreviewState.isDropping
                    ? styles.Dropzone : styles.Wrapper}
                ref={el => {
                    this.divRef = el;
                }}>
                <div className={styles.Supporter}/>
                {this.props.children}
            </div>
        );
    }
}
