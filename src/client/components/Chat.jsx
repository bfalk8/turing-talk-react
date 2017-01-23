import React, { Component } from 'react';
import Feed from 'components/Feed';
import MessageInput from 'components/MessageInput';

class Chat extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <Feed messages={this.props.messages} />
        <MessageInput sendmethod={this.props.sendmethod} />
      </div>
    );
  }
}

export default Chat;
