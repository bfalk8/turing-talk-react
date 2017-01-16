import React, { Component } from 'react';
import Message from 'components/Message';

class Feed extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.messages.map((message) => 
            <li> <Message messageText={message} /> </li>)}
        </ul>
      </div>
    );
  }
}

export default Feed;
