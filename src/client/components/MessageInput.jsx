import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {messageText: "What do you want to say?"}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.textInput.value);
    this.props.sendmethod(this.textInput.value);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder={this.state.messageText} 
          ref={(input) => {this.textInput = input}}
        />
        <input type="button" name="submit_btn" value="Send" 
          onClick={this.handleClick} />
      </div>
    );
  }
}

export default MessageInput;
