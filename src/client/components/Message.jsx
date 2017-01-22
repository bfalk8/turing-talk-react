import React, { Component } from 'react';
import style from './Message.css';

class Message extends Component {
  render() {
    return (
      <div className={style.root}>
        <p className={style.message}>Encoded Message: {this.props.encodedMessage}</p>
        <p className={style.message}>Decoded Message: {this.props.decodedMessage}</p>
      </div>
    );
  }
}

export default Message;
