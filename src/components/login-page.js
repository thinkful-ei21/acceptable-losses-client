import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import styles from './styles/forms.module.css';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/app/dashboard" />;
  }

  return (
    <div className={styles.background}>
      <section className={styles.form}>
        <LoginForm />
        <Link className={styles.linkToOtherForm} to="/register">
          Need to Register? Register here!
        </Link>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
