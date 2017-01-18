import React, { Component } from 'react';
import styles from './Message.css';

class Message extends Component {
  render() {
    return (
      <div className={styles.root}>
        <p>Encoded Message: {this.props.encodedMessage}</p>
        <p>Decoded Message: {this.props.decodedMessage}</p>
      </div>
    );
  }
}

export default Message;
