import React, { Component } from 'react';
import style from './EnigmaSettings.css';

const rotorOptions = [...Array(8).keys()];
const shiftOptions = [...Array(26).keys()];
const alphabet     = " ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const stdPlug      = [' ',' '];
const maxPlugs     = 10;

class EnigmaSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, errorMsg: ''};
    this.handleUpdate     = this.handleUpdate.bind(this);
    this.handlePlugUpdate = this.handlePlugUpdate.bind(this);
    this.addPlug          = this.addPlug.bind(this);
    this.showError        = this.showError.bind(this);
    this.clearError       = this.clearError.bind(this);
  }

  showError(errorMsg) {
    this.setState({hasError: true, errorMsg: errorMsg});
    console.error(errorMsg);
  }

  clearError() {
    this.setState({hasError: false, errorMsg: ''});
  }

  handleUpdate(e) {
    let updatedSettings = {};
    updatedSettings[e.target.name] = e.target.value;
    this.props.updateSettings(updatedSettings);
  }

  handlePlugUpdate(e) {
    this.clearError();
    let value = e.target.value;
    let plugIndex = parseInt(e.target.name.split(' ')[1]);
    let firstEntry = e.target.name.split(' ')[0].endsWith('A');
    let arr = this.props.plugboard.slice(0);
    let duplicate = arr.reduce((accum, elem, index, array) => (accum || elem.includes(value)), false);

    if(duplicate) {
      this.showError(`Can't have duplicates in plug layout!`);
      return;
    }

    arr[plugIndex][firstEntry ? 0 : 1] = value;
    let updatedSettings = {plugboard: arr};
    this.props.updateSettings(updatedSettings);
  }

  addPlug() {
    this.clearError();
    if(this.props.plugboard.length >= maxPlugs) {
      this.showError(`Can't have more than ${maxPlugs} plugs in plugboard!`);
      return;
    }
    let updatedSettings = {plugboard: this.props.plugboard.concat([stdPlug.slice(0)])};
    this.props.updateSettings(updatedSettings);
  }

  render() {
    let plugs = [];
    this.props.plugboard.forEach((elem, index) => {
      plugs.push(
        <div className={style.row}>
          <div className={style.col}>
            <select name={`plugA ${index}`} onChange={this.handlePlugUpdate} 
              value={elem[0]}>
              {alphabet.map((x) => (<option value={x}>{x}</option>))}
            </select>
          </div>
          <div className={style.col}>
            { '<--->' }
          </div>
          <div className={style.col}>
            <select name={`plugB ${index}`} onChange={this.handlePlugUpdate} 
              value={elem[1]}>
              {alphabet.map((x) => (<option value={x}>{x}</option>))}
            </select>
          </div>
        </div>
      );});

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

        <div className={style.row}>
          <div className={style.colWhole}>
            <p>Plug Board</p>
          </div>
        </div>

        {this.state.hasError ? 
          (<div className={style.errorBox}>
            {this.state.errorMsg}
          </div>)
          : ('')
        }

        {plugs}

        <div className={style.row}>
          <button className={style.addBtn} onClick={this.addPlug}>+ Add Plug +</button>
        </div>

      </div>
    );
  }
}

export default EnigmaSettings;
