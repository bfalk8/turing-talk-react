import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <p>{this.props.messageText}</p>
    );
  }
}

export default Message;
