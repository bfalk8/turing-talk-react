import React, { Component } from 'react';
import style from './EnigmaSettings.css';

let rotorOptions = [...Array(8).keys()];
let shiftOptions = [...Array(26).keys()];

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
        <h2 className={style.title}>Enigma Settings</h2>
        <div className={style.row}>
          <div className={style.col}>
            <p>Left Rotor</p>
            <select name='leftRotor' onChange={this.handleUpdate} 
              value={this.props.leftRotor}>
              {rotorOptions.map((x) => (<option value={x+1}>{x+1}</option>))}
            </select>
          </div>

          <div className={style.col}>
            <p>Middle Rotor</p>
            <select name='middleRotor' onChange={this.handleUpdate} 
              value={this.props.middleRotor}>
              {rotorOptions.map((x) => (<option value={x+1}>{x+1}</option>))}
            </select>
          </div>

          <div className={style.col}>
            <p>Right Rotor</p>
            <select name='rightRotor' onChange={this.handleUpdate} 
              value={this.props.rightRotor}>
              {rotorOptions.map((x) => (<option value={x+1}>{x+1}</option>))}
            </select>
          </div>

        </div>
        <div className={style.row}>
          <div className={style.col}>
            <p>Left Shift</p>
            <select name='leftShift' onChange={this.handleUpdate} 
              value={this.props.leftShift}>
              {shiftOptions.map((x) => (<option value={x}>{x}</option>))}
            </select>
          </div>

          <div className={style.col}>
            <p>Middle Shift</p>
            <select name='middleShift' onChange={this.handleUpdate} 
              value={this.props.middleShift}>
              {shiftOptions.map((x) => (<option value={x}>{x}</option>))}
            </select>
          </div>

          <div className={style.col}>
            <p>Right Shift</p>
            <select name='rightShift' onChange={this.handleUpdate} 
              value={this.props.rightShift}>
              {shiftOptions.map((x) => (<option value={x}>{x}</option>))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default EnigmaSettings;
