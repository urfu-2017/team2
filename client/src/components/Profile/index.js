import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styles from './index.css';

@inject('state') @observer
export default class Profile extends Component {
    static propTypes = {
        closeProfile: PropTypes.func,
        state: PropTypes.object,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            login: PropTypes.string
        }
        )
    };

    changeHandler(event) {
        this.props.state.uploadAvatar(event.currentTarget.files[0]);
        event.currentTarget.value = '';
    }

    render() {
        return (
            <div className={this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}
            onClick={this.props.state.showProfile.bind(this.props.state)}>
                <img className={this.props.state.loadAvatar ? styles.Loader : styles.Photo}
                    src={this.props.profile.avatar}/>
                <div className={styles.Info}>
                    <div>
                        <div className={styles.Name}>{this.props.profile.login}</div>
                        <div className={styles.Status}>{'online'}</div>
                    </div>
                    <label>
                        <input type="file" onChange={this.changeHandler.bind(this)}
                            accept="image/*" className={styles.ChangeAvatarButton}/>
                        <i>Change avatar</i>
                    </label>
                    <div className={styles.Login}>
                        <span className={styles.LoginHeader}>User nickname: </span>
                        <span className={styles.LoginValue}>@{this.props.profile.login}</span>
                    </div>
                </div>
            </div>
        );
    }
}


