import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropsTypes } from 'mobx-react';
import OGAttachment from
    './OGAttachment';
import styles from './index.css';
import { inject, observer } from 'mobx-react';

@inject('reactionSelectorState', 'alarmState') @observer
export default class UserMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        reactionSelectorState: MobxPropsTypes.observableObject,
        alarmState: MobxPropsTypes.observableObject,

        id: PropTypes.string,
        fromMe: PropTypes.bool.isRequired,
        isSent: PropTypes.bool,
        name: PropTypes.string,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        og: PropTypes.object,
        attachments: PropTypes.object,
        reactions: PropTypes.object
    };

    showReactionSelector(event) {
        const rect = event.target.getBoundingClientRect();
        const x = (rect.right - rect.left) / 2 + rect.left;
        const y = rect.top;

        this.props.reactionSelectorState.toggleReactionSelector(x, y, this.props.id);
    }

    showAlarm(event) {
        const rect = event.target.getBoundingClientRect();
        const x = (rect.right - rect.left) / 2 + rect.left;
        const y = rect.top;

        this.props.alarmState.toggleAlarm(x, y, this.props.id);
    }

    onClickReaction(code) {
        this.props.reactionSelectorState.messageId = this.props.id;
        this.props.reactionSelectorState.sendReaction(code);
    }

    getActionButtons() {
        const showButtons = [
            this.props.reactionSelectorState.messageId === this.props.id,
            this.props.alarmState.messageId === this.props.id
        ].some(x => x);

        const msgActionsStyle = {
            display: showButtons ? 'block' : ''
        };
        if (this.props.id) {
            return (
                <div className={styles.MessageActions} style={msgActionsStyle}>
                    <div
                        className={styles.MessageAction}
                        onClick={this.showReactionSelector.bind(this)}
                    >
                        <i className="material-icons">add</i>
                    </div>
                    <div
                        className={styles.MessageAction}
                        onClick={this.showAlarm.bind(this)}
                    >
                        <i className="material-icons">schedule</i>
                    </div>
                </div>
            );
        }
    }

    getReactions() {
        return Object.keys(this.props.reactions).map(code =>
            <div
                className={styles.Reaction}
                key={code}
                onClick={this.onClickReaction.bind(this, code)}
            >
                <span>{String.fromCodePoint(parseInt(code, 16))}</span>
                <span>{this.props.reactions[code].length}</span>
            </div>
        );
    }

    render() {
        const className =
            `${styles.Message} ${this.props.fromMe ? styles.FromMe : styles.FromSomeone}`;

        return (
            <div className={className}>
                {this.getActionButtons()}
                <div style={{ clear: 'both' }}/>
                <div className={styles.Wrapper}>
                    <span className={styles.Name}>{this.props.name}</span>
                    <div className={styles.Body}
                        dangerouslySetInnerHTML={{ __html: this.props.body }}
                    />
                    {this.props.og &&
                        <OGAttachment
                            url={this.props.og.requestUrl}
                            title={this.props.og.data.ogTitle}
                            description={this.props.og.data.ogDescription}
                            image={this.props.og.data.ogImage} />}
                    <time className={styles.Time}>
                        <span>{this._formatDate(this.props.createdAt)}</span>

                        {(this.props.fromMe && !this.props.isSent) &&
                            <span className={styles.BottomIcon}>
                                <i className="material-icons">schedule</i>
                            </span>
                        }
                    </time>
                    {this.props.attachments
                        ? <div className={styles.ImageWrapper}>
                            {this.props.attachments.map((attachment, index) => (
                                <img key={index} src={attachment} className={styles.Img}/>
                            ))}
                        </div>
                        : null}
                </div>

                <div className={styles.Reactions}>
                    {this.getReactions()}
                </div>
            </div>
        );
    }

    _formatDate(createdAt) {
        if (!createdAt) {
            return;
        }

        createdAt = new Date(createdAt);

        return createdAt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
}
