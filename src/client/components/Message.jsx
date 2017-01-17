import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <p>Encoded Message: {this.props.encodedMessage}</p>
        <p>Decoded Message: {this.props.decodedMessage}</p>
      </div>
    );
  }
}

export default Message;
