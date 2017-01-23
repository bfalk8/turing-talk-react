import React, { Component } from 'react';
import style from './MessageInput.css';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {messageText: "What do you want to say?"}
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  handleClick() {
    this.props.sendmethod(this.textInput.value);
    this.clearText();
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.props.sendmethod(this.textInput.value);
      this.clearText();
    }
  }

  clearText() {
    this.textInput.value = '';
  }

  render() {
    return (
      <div className={style.row}>
        <input className={style.text} type="text" placeholder={this.state.messageText} 
          onKeyDown={this.handleKeyPress}
          ref={(input) => {this.textInput = input}}
        />
      </div>
    );
  }
}

export default MessageInput;
