import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div>
      <p>SELL APP HERE</p>
      <Link to="/login">
        <button>SIGN IN</button>
      </Link>
      <Link to="/register">Sign Up Here</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
