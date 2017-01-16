import React, {Component} from 'react';
import io from 'socket.io-client';
import Chat from 'components/Chat';

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
      messages: this.state.messages.concat(message)
    });
  }

  sendMessage(message) {
    socket.emit('chat message', message);
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
        <Chat messages={ this.state.messages } sendmethod={ this.sendMessage } />
      </div>
    );
  }

}

export default TuringTalk;
