import React from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import styles from './index.css';
import ChatEmojiPicker from '../ChatEmojiPicker';
import Preview from '../ChatPreview';

@inject('chatInputState', 'chatPreviewState') @observer
export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatInputState: PropTypes.observableObject,
        chatPreviewState: PropTypes.observableObject
    };

    submitHandler(event) {
        event.preventDefault();
        this.props.chatInputState.submit();
    }

    changeHandler(event) {
        event.preventDefault();
        this.props.chatInputState.change(event.target.value);
    }

    emojiButtonClick() {
        this.props.chatInputState.toggleEmojiList();
        this.chatInput.focus();
    }

    render() {
        return (
            <div>
                {this.props.chatInputState.showEmojiList
                    ? <ChatEmojiPicker
                        onEmojiClick={this.props.chatInputState.addEmojiIntoText
                            .bind(this.props.chatInputState)}
                        onMouseLeave={this.props.chatInputState.toggleEmojiList
                            .bind(this.props.chatInputState)}/>
                    : null}
                <article className={styles.SendBar}>
                    <form id="send-message-form" className={styles.Wrapper}
                        onSubmit={this.submitHandler.bind(this)}>
                        <Preview chatPreviewState={this.props.chatPreviewState}/>
                        <input type="text" className={styles.Input}
                            value={this.props.chatInputState.chatInput}
                            placeholder=" Write a message..."
                            onChange={this.changeHandler.bind(this)}
                            ref={(input) => {
                                this.chatInput = input;
                            }}
                            autoFocus/>
                        <button type="button" className={`${styles.EmojiButton} ${styles.Button}`}
                            onClick={this.emojiButtonClick.bind(this)}>
                            <i className="material-icons">tag_faces</i>
                        </button>
                        <button form="send-message-form" type="submit"
                            className={`${styles.SendButton} ${styles.Button}`}>
                            <i className="material-icons">send</i>
                        </button>
                    </form>
                </article>
            </div>
        );
    }
}
