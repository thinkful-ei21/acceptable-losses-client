import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const onClick = () => {
    console.log("Why won't I work?!?!?!");
    return <Redirect to="/login" />;
  };

  return (
    <div className="home">
      <h1 className="">ACCEPTABLE LOSSES</h1>
      <p className="">SELL APP HERE</p>
      <button className="signin-button" onClick={() => onClick()}>
        SIGN IN
      </button>
      <Link className="register-link" to="/register">
        Sign Up Here
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
