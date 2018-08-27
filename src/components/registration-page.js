import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';
import styles from './styles/forms.module.css';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={styles.background}>
      <section className={styles.form}>
        <RegistrationForm />
        <Link className={styles.linkToOtherForm} to="/login">
          Already have an account? Login here!
        </Link>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
