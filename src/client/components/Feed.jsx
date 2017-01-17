import React, { Component } from 'react';
import Message from 'components/Message';

class Feed extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.messages.map((message) => 
            <li> <Message 
                encodedMessage={message.encoded} 
                decodedMessage={message.decoded} /> 
            </li>)}
        </ul>
      </div>
    );
  }
}

export default Feed;
