import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import buttonStyles from './styles/buttons.module.css';
import styles from './styles/landingPage.module.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/login">
          Login
        </Link>
        <Link to="/register">
          <button className={`${buttonStyles.form} ${styles.signInButton}`}>
            SIGN UP
          </button>
        </Link>
      </nav>

      <section className={styles.landingContent}>
        <h1>Acceptable Losses</h1>
        <p>
          Have you ever been late on a bill? Has a bill ever caught you off guard?
          With Acceptable Losses, you can keep track of all of your bills, see due
          dates of upcoming bills, click a button to visit your bill's payment
          website and mark them as paid. Staying on top of your expenses is as easy
          as hitting a button!
        </p>
        <img className={styles.landingCloud}
          src={require('../assets/landingPage/landingCloud.svg')}
          alt="decorative 'cloud'"
        />
      </section>



    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
