import React, {Component} from 'react';
import io from 'socket.io-client';
import { translateInput } from 'enigma';
import style from './TuringTalk.css';
import Chat from 'components/Chat';
import EnigmaSettings from 'components/EnigmaSettings';
import Menu from 'react-burger-menu';

let socket = io();

let defaultSettings = {
  leftRotor: 1,
  leftShift: 0,
  middleRotor: 2,
  middleShift: 0,
  rightRotor: 3,
  rightShift: 0,
  plugboard: []
};

var menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '25px',
    top: '25px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '30px',
    width: '30px'
  },
  bmCross: {
    background: '#373a47'
  },
  bmMenu: {
    background: '#f5f5f5',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    padding: '0.8em',
    height: 'auto'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
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
        {encoded: message, decoded: this.translateMessage(message), 
          timestamp: new Date().toString()})
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
        rightShift: settings.rightShift   || this.state.enigmaSettings.rightShift,
        plugboard: settings.plugboard     || this.state.enigmaSettings.plugboard
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
        <Menu.scaleRotate right styles={menuStyles} pageWrapId={"pageWrap"} outerContainerId={"app"}>
          <EnigmaSettings 
            updateSettings={this.updateSettings} 
            {...this.state.enigmaSettings}
          />
        </Menu.scaleRotate>
        <div id="pageWrap" className={style.pagewrap}>
          <h1> Turing Talk! </h1>
          <div className={style.row}>
            <div className={style.chatDesc}>
              <p>Encrypted messages over the wire like it's the 1940's...</p>
            </div>
            <Chat
              className={style.chat}
              messages={ this.state.messages }
              sendmethod={ this.sendMessage }
            />
          </div>
        </div>
      </div>
    );
  }

}

export default TuringTalk;
