import React, {Component} from 'react';
import io from 'socket.io-client';
import { translateInput } from 'enigma';
import style from './TuringTalk.css';
import Chat from 'components/Chat';
import EnigmaSettings from 'components/EnigmaSettings';

let serverAddress = 'localhost';
let serverPort = '3000';
// let socket = io(`${serverAddress}:${serverPort}`);
let socket = io();
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
    this.sendMessage = this.sendMessage.bind(this);
    this.translateMessage = this.translateMessage.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  handleMessage(message) {
    this.setState({
      messages: this.state.messages.concat(
        {encoded: message, decoded: this.translateMessage(message), timestamp: new Date().toString()})
    });
  }

  sendMessage(message) {
    let msg = this.translateMessage(message);
    socket.emit('chat message', msg);
  }

  translateMessage(message) {
    return translateInput(message, this.state.enigmaSettings);
  }

  updateSettings(settings) {
    this.setState({
      enigmaSettings:{
        leftRotor: settings.leftRotor     || this.state.enigmaSettings.leftRotor,
        leftShift: settings.leftShift     || this.state.enigmaSettings.leftShift,
        middleRotor: settings.middleRotor || this.state.enigmaSettings.middleRotor,
        middleShift: settings.middleShift || this.state.enigmaSettings.middleShift,
        rightRotor: settings.rightRotor   || this.state.enigmaSettings.rightRotor,
        rightShift: settings.rightShift   || this.state.enigmaSettings.rightShift
    }});
  }

  componentDidMount() {
    socket.connect();
    socket.on('init', (data) => {
      console.log(data);
    });
    socket.on('chat message', (data) => this.handleMessage(data));
  }

  render() {
    return (
      <div>
        <h1> Turing Talk! </h1>
        <div className={style.row}>
          <Chat
            className={style.chat}
            messages={ this.state.messages }
            sendmethod={ this.sendMessage }
          />
          <EnigmaSettings 
            className={style.settings}
            updateSettings={this.updateSettings} 
            {...this.state.enigmaSettings}/>
        </div>
      </div>
    );
  }

}

export default TuringTalk;
