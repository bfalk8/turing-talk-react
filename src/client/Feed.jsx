import React, { Component } from 'react';
import Message from './Message';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: props.messages || []};
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map((message) => 
            <li> <Message messageText={message} /> </li>)}
        </ul>
      </div>
    );
  }
}

export default Feed;
