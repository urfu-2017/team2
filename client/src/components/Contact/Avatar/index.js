import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        src: PropTypes.string,
        size: PropTypes.number
    };

    render() {
        return (
            <img className={styles.Avatar} src={this.props.src}
                width={this.props.size || 48} height={this.props.size || 48} />
        );
    }
}
