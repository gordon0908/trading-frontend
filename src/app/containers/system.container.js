import React, { Component } from 'react';
import OpenSocket from 'socket.io-client';


class SystemContainer extends Component {
  componentDidMount() {
    const socket = OpenSocket('https://trading-gt-backend.herokuapp.com');

    socket.on('newInstance', data => console.log(data));
    // socket.emit('getHistory', 'APPL');
    // socket.on('marketData', data => console.log(data));

    socket.emit('gitIndicator', 'united-states');
    socket.on('indicatorData', data => console.log(data));
  }
  render() {
    return (
      <div className="container">
        SystemContainer
      </div>
    )
  }
}

export default SystemContainer;
