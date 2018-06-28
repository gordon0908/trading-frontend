import React, { Component } from 'react';

class WelcomeContainer extends Component {
  constructor(){
      super(...arguments);
  }
  render() {
    const html = (
      <div className="container">
        <h1>Welcome to Stock Market Simulator</h1>
      </div>
    );
    return html;
  }
}

export default WelcomeContainer;
