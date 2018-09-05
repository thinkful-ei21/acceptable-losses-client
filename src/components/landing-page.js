import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import buttonStyles from './styles/buttons.module.css';
import formStyles from './styles/forms.module.css';
import styles from './styles/landingPage.module.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>Acceptable Losses</h1>
      <p className={styles.sellApp}>
        SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL
        THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP
        HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! - SELL THE APP HERE! -
      </p>
      <Link className={styles.signIn} to="/login">
        <button className={buttonStyles.form}>SIGN IN</button>
      </Link>
      <Link className={formStyles.linkToOtherForm} to="/register">
        Need to Register? Register here!
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
