import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { observer, inject } from 'mobx-react';

@inject('state') @observer
export default class OGAttachment extends Component {
    constructor(props) {
        super(props);

        this.imageUrl = this.props.image.url || (this.props.image[0] && this.props.image[0].url);
        if (this.imageUrl && this.imageUrl.startsWith('/')) {
            this.imageUrl = this.props.url + this.imageUrl;
        }
    }

    static propTypes = {
        state: PropTypes.object,
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object
    };

    render() {
        return (
            <a href={this.props.url} className={!this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}>
                <div className={styles.Info}>
                    <span className={!this.props.state.mainView.isNightTheme
                        ? styles.Title : styles.TitleNight}>{this.props.title}</span>
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
