import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class OGAttachment extends Component {
    constructor(props) {
        super(props);

        this.imageUrl =
            this.props.image.url ||
            (this.props.image.find(img => img.url.startsWith('http')) &&
                this.props.image.find(img => img.url.startsWith('http')).url);

    }

    static propTypes = {
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object
    }

    render() {
        return (
            <a href={this.props.url} className={styles.Wrapper}>
                <div className={styles.Info}>
                    <span className={styles.Title}>{this.props.title}</span>
                    {
                        this.props.description
                            ? <span className={styles.Description}>{this.props.description}</span>
                            : null
                    }
                    {
                        this.imageUrl
                            ? <img src={this.imageUrl} />
                            : null
                    }
                </div>
            </a>
        );
    }
}
