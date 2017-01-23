import React, { Component } from 'react';
import style from './Feed.css';
import Message from 'components/Message';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {shouldScroll: true};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate() {
    if(this.state.shouldScroll) {
      this.feedDiv.scrollTop = this.feedDiv.scrollHeight;
    }
  }

  handleScroll(elem) {
    this.setState({
      // check if the user has scrolled away from most recent message
      shouldScroll: elem.target.scrollHeight - elem.target.scrollTop === elem.target.clientHeight
    });
  }

  render() {
    return (
      <div className={style.root} ref={(elem) => this.feedDiv = elem} onScroll={this.handleScroll}>
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
