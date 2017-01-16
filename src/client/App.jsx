import React, { Component } from 'react';
import io from 'socket.io-client';

let socket = io(`localhost:3000`);

class App extends Component {
  componentDidMount() {
    socket.on('init', () => {
      console.log('weeeeee');
    });
  }

  render() {
    return (
      <div>
        <h1> Hello World! </h1>
      </div>
    );
  }
}

export default App;
