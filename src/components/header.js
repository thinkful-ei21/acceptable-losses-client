import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { NavLink } from 'react-router-dom';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let header;
    if (this.props.loggedIn) {
      header = (
        <nav>
          <button onClick={() => this.logOut()}>Log out</button>
          <NavLink to="/dashboard">Home |</NavLink>
          <NavLink to="/accounts">Accounts |</NavLink>
          <NavLink to="/add-account">Add Bill</NavLink>
        </nav>
      );
    }
    return <div>{header}</div>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
