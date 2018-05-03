import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class ChatHistory extends Component {
    constructor(props) {
        super(props);

        this.divRef = null;
    }

    static propTypes = {
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

    render() {
        return (
            <div className={styles.Wrapper} ref={el => {
                this.divRef = el;
            }}>
                <div className={styles.Supporter}/>
                {this.props.children}
            </div>
        );
    }
}
