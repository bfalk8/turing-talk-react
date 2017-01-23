import React, { Component } from 'react';
import style from './Feed.css';
import Message from 'components/Message';

class Feed extends Component {

  render() {
    return (
      <div className={style.root} >
        {this.props.messages.map((message) => 
          <Message 
            encodedMessage={message.encoded} 
            decodedMessage={message.decoded}
            timestamp={message.timestamp}
          /> 
        )}
      </div>
    );
  }
}

export default Feed;
