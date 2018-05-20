/* eslint-disable no-invalid-this*/
import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.css';
import { PropTypes } from 'mobx-react';
import Popup from 'reactjs-popup';


@observer
export default class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatPreviewState: PropTypes.observableObject
    };

    renderPreview() {
        const { chatPreviewState } = this.props;
        const attachments = chatPreviewState.attachments;
        if (!attachments) {
            return (<React.Fragment />);
        }

        return (
            <section className={styles.PreviewImgList}>
                {chatPreviewState.error &&
                    <Popup
                        open={true}
                        modal
                        closeOnEscape
                        contentStyle={this.defaultStyleOverride}
                        closeOnDocumentClick
                        onClose={chatPreviewState.clearError
                            .bind(chatPreviewState)}>
                        {
                            (close) => (
                                <div className={styles.PopupContainer}>
                                    <span className={styles.ErrorMessage}>
                                        {chatPreviewState.error}
                                    </span>
                                    { <span className={styles.PopupClose} onClick={close}>
                                        <i className="material-icons">close</i>
                                    </span>}
                                </div>
                            )
                        }
                    </Popup>}
                {attachments.map((url, index) =>
                    <div key={index} className={styles.PreviewImg}>
                        {url === 'loading'
                            ? <div className={`${styles.Loader} ${styles.Img}`}/>
                            : <img className={styles.Img} src={url}/>}
                        <button type="button" key={index} className={`${styles.CloseButton}
                            ${styles.Button}`}
                        onClick={chatPreviewState.remove.bind(chatPreviewState, index)}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                )}
            </section>
        );
    }

    render() {

        return (
            <React.Fragment>
                {this.renderPreview()}
            </ React.Fragment>
        );
    }
}
