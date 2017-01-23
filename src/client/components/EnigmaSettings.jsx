import React, { Component } from 'react';

let options = [...Array(8).keys()];

class EnigmaSettings extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    let updatedSettings = {};
    updatedSettings[e.target.name] = e.target.value;
    this.props.updateSettings(updatedSettings);
  }

  render() {
    return (
      <div className={this.props.className}>
        <p>Left Rotor</p>
        <select name='leftRotor' onChange={this.handleUpdate} 
          value={this.props.leftRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>

        <p>Middle Rotor</p>
        <select name='middleRotor' onChange={this.handleUpdate} 
          value={this.props.middleRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>

        <p>Right Rotor</p>
        <select name='rightRotor' onChange={this.handleUpdate} 
          value={this.props.rightRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>

        <p>Left Shift</p>
        <input type="text" name='leftShift' value={this.props.leftShift} 
          onChange={this.handleUpdate}
        />

        <p>Middle Shift</p>
        <input type="text" name='middleShift' value={this.props.middleShift} 
          onChange={this.handleUpdate}
        />

        <p>Right Shift</p>
        <input type="text" name='rightShift' value={this.props.rightShift} 
          onChange={this.handleUpdate}
        />
      </div>
    );
  }
}

export default EnigmaSettings;
