/* eslint-disable complexity*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.css';
import Popup from 'reactjs-popup';

@inject('state', 'dataStore') @observer
export default class Profile extends Component {
    static propTypes = {
        close: PropTypes.func,
        state: PropTypes.object,
        profile: PropTypes.shape({
            avatar: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
            status: PropTypes.string,
            link: PropTypes.string
        }).isRequired,
        canChangeAvatar: PropTypes.bool
    };

    defaultStyleOverride = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px',
        background: 'white',
        color: 'gray'
    };

    defaultStyleOverrideNight = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px',
        background: 'gray',
        color: 'white'
    };

    changeHandler(event) {
        this.props.state.uploadAvatar(event.currentTarget.files[0]);
        event.currentTarget.value = '';
    }

    render() {
        return (
            <div className={!this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}>
                <img className={this.props.state.loadAvatar ? styles.Loader : styles.Photo}
                    src={this.props.profile.avatar}/>
                <i onClick={this.props.close} className={
                    `material-icons ${this.props.state.mainView.isNightTheme
                        ? styles.BackButton
                        : styles.BackButtonNight}`}>
                    close
                </i>
                <div className={styles.Info}>
                    <div title={this.props.profile.login}>
                        <div className={styles.Name}>{this.props.profile.login}</div>
                    </div>
                    { this.props.canChangeAvatar &&
                        <span>
                            <input type="file" id="avatar-input"
                                onChange={this.changeHandler.bind(this)}
                                accept="image/*" className={styles.ChangeAvatarButton}/>
                            <label htmlFor="avatar-input">Change avatar</label>
                            {this.props.state.error &&
                    <Popup
                        open={true}
                        modal
                        closeOnEscape
                        closeOnDocumentClick
                        contentStyle={this.props.state.mainView.isNightTheme
                            ? this.defaultStyleOverride : this.defaultStyleOverrideNight}
                        onClose={this.props.state.clearError}>
                        {
                            (close) => (
                                <div className={styles.PopupContainer}>
                                    <span className={styles.ErrorMessage}>
                                        {this.props.state.error}
                                    </span>
                                    { <span className={styles.PopupClose} onClick={close}>
                                        <i className="material-icons">close</i>
                                    </span>}
                                </div>
                            )
                        }
                    </Popup>}
                        </span>
                    }
                    {/* <div className={styles.Login}>
                        <span className={styles.LoginHeader}>User nickname: </span>
                        <span className={styles.LoginValue}>@{this.props.profile.login}</span>
                    </div> */}
                    {this.props.profile.link &&
                        <div className={styles.Link}>
                            <span className={styles.LinkHeader}>Link: </span>
                            <input className={styles.LinkInput}
                                disabled value={this.props.profile.link}/>
                            <CopyToClipboard text={this.props.profile.link}>
                                <button className={styles.CopyLinkButton}>
                                    <i className="material-icons">content_copy</i>
                                </button>
                            </CopyToClipboard>
                        </div>}
                </div>
            </div>
        );
    }
}


