import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class OGAttachment extends Component {
    constructor(props) {
        super(props);

        this.imageUrl = this.props.image.url || (this.props.image[0] && this.props.image[0].url);
        if (this.imageUrl && this.imageUrl.startsWith('/')) {
            this.imageUrl = this.props.url + this.imageUrl;
        }
    }

    static propTypes = {
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object
    };

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
                            ? <img className={styles.OgImage} src={this.imageUrl} />
                            : null
                    }
                </div>
            </a>
        );
    }
}
