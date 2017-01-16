import React, {Component} from 'react';
import io from 'socket.io-client';
import Feed from './Feed';

let serverAddress = 'localhost';
let serverPort = '3000';
let socket = io(`${serverAddress}:${serverPort}`);

class TuringTalk extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: props.messages || []}
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(message) {
    this.setState({
      messages: this.state.messages.push(message)
    });
  }

  componentDidMount() {
    socket.on('init', (data) => {
      console.log(data);
    });
    socket.on('chat message', (data) => this.handleMessage(data));
  }

  render() {
    return (
      <div>
        <h1> Turing Talk! </h1>
        <Feed messages={ this.state.messages } />
      </div>
    );
  }

}

export default TuringTalk;
