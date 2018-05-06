import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import styles from './index.css';
import Popup from 'reactjs-popup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { observer } from 'mobx-react';

@observer
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
        status: PropTypes.string,
        inviteLink: PropTypes.string
    };

    render() {
        return (
            <Popup
                trigger={<div className={styles.Wrapper}>
                    <Avatar src={this.props.avatar} size={48}/>
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
                        <Avatar className={styles.PopupAvatar} src={this.props.avatar} size={70}/>
                        <span className={styles.PopupName}>
                            {this.props.name}
                        </span>
                        <span className={styles.PopupStatus}>
                            {this.props.status}
                        </span>
                        {this.props.inviteLink &&
                        <Fragment>
                            <span className={styles.PopupLinkHeader}>Link:</span>
                            <div className={styles.PopupLinkValue}>
                                <input className={styles.PopupLinkInput} disabled
                                    value={this.props.inviteLink}/>
                                <CopyToClipboard text={this.props.inviteLink}>
                                    <button className={styles.PopupCopyButton}>
                                        <i className="material-icons">content_copy</i>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </Fragment>
                        }
                    </div>
                )}
            </Popup>
        );
    }
}
