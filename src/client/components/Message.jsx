import React, { Component } from 'react';
import style from './Message.css';

class Message extends Component {
  render() {
    return (
      <div className={style.root}>
        <div className={style.messageEncoded}>
          <p className={style.message}>{this.props.encodedMessage}</p>
          <p className={style.timestamp}>{this.props.timestamp}</p>
        </div>
        <div className={style.messageDecoded}>
          <p className={style.message}>{this.props.decodedMessage}</p>
        </div>
      </div>
    );
  }
}

export default Message;
