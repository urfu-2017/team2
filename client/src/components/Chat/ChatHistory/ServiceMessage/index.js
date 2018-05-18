import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class ServiceMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className={styles.Message}>{this.props.text}</div>
        );
    }
}
