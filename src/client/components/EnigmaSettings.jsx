import React, { Component } from 'react';

let options = [...Array(8).keys()];

class EnigmaSettings extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    let updatedSettings = {};
    updatedSettings[e.target.name] = e.target.value;
    this.props.updateSettings(updatedSettings);
  }

  render() {
    return (
      <div>
        <p>Left Rotor</p>
        <select name='leftRotor' onChange={this.handleSelect} 
          value={this.props.leftRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>

        <p>Middle Rotor</p>
        <select name='middleRotor' onChange={this.handleSelect} 
          value={this.props.middleRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>

        <p>Right Rotor</p>
        <select name='rightRotor' onChange={this.handleSelect} 
          value={this.props.rightRotor}>
          {options.map((x) => (<option value={x+1}>{x+1}</option>))}
        </select>
      </div>
    );
  }
}

export default EnigmaSettings;
