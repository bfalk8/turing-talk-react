import React, {Component} from 'react';
import io from 'socket.io-client';
import { encode, decode } from 'enigma';
import Chat from 'components/Chat';

let serverAddress = 'localhost';
let serverPort = '3000';
let socket = io(`${serverAddress}:${serverPort}`);
let defaultSettings = {
  leftRotor: 1,
  leftShift: 0,
  middleRotor: 2,
  middleShift: 0,
  rightRotor: 3,
  rightShift: 0
};

class TuringTalk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages || [],
      enigmaSettings: props.enigmaSettings || defaultSettings
    }
    this.handleMessage = this.handleMessage.bind(this);
    this.encodeMessage = this.encodeMessage.bind(this);
    this.decodeMessage = this.decodeMessage.bind(this);
  }

  handleMessage(message) {
    this.setState({
      messages: this.state.messages.concat(
        {encoded: message, decoded: this.decodeMessage(message)})
    });
  }

  sendMessage(message) {
    socket.emit('chat message', message);
  }

  encodeMessage(message) {
    return encode(message, this.state.enigmaSettings);
  }

  decodeMessage(message) {
    return decode(message, this.state.enigmaSettings);
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
        <Chat
          messages={ this.state.messages }
          sendmethod={ this.sendMessage }
        />
      </div>
    );
  }

}

export default TuringTalk;
