import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './index.css';

@observer
export default class Profile extends Component {
    static propTypes = {
        closeProfile: ReactPropTypes.func,
        profile: ReactPropTypes.shape({
            avatar: ReactPropTypes.string,
            login: ReactPropTypes.string
        }
        )
    };

    render() {
        return (
            <div className={styles.Wrapper}>
                <button className={styles.BackButton}
                    onClick={this.props.closeProfile}>&larr;</button>
                <img className={styles.Photo} src={this.props.profile.avatar}/>
                <div className={styles.Info}>
                    <div className={styles.Name}>{this.props.profile.login}</div>
                    <div className={styles.Status}>{'online'}</div>
                    <div className={styles.Login}>
                        <span className={styles.LoginHeader}>Имя пользователя: </span>
                        <span className={styles.LoginValue}>@{this.props.profile.login}</span>
                    </div>
                </div>
            </div>
        );
    }
}


