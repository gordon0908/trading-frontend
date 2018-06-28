import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  getSelectedClass = (location, currentPage) => location.pathname === currentPage? 'blocked-at' : 'blocked-no';
  render() {
    const { location } = this.props;
    const navClass = (location.pathname === '/realtime')? 'rt-alter' : 'rt-alter';
    return (
      <nav id="topNav" className={navClass}>
        <Link to="/" >
          <span className={this.getSelectedClass(location, '/')}>Home</span>
        </Link>

        <Link to="/realtime">
          <span className={this.getSelectedClass(location, '/realtime')}>Real Time</span>
        </Link>
      </nav>
    )
  }
}

export default withRouter(Nav);
