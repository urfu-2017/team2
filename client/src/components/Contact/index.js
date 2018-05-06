import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import styles from './index.css';
import Checkbox from 'rc-checkbox';

export default class Contact extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        avatar: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        withCheckbox: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        isChecked: PropTypes.bool
    };

    render() {
        return (
            <a className={styles.Wrapper} onClick={this.props.onClick}>
                <Avatar src={this.props.avatar} size={52}/>
                <span className={styles.Name}>
                    {this.props.login}
                </span>
                <span className={styles.Info}>
                    @{this.props.login}
                </span>
                {this.props.withCheckbox &&
                <Checkbox checked={this.props.isChecked}/>
                }
            </a>
        );
    }
}
