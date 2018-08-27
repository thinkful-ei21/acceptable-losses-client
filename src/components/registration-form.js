import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';

import Input from './input';

import styles from './styles/forms.module.css';
import buttonStyles from './styles/buttons.module.css';

import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props.dispatch(registerUser(user)).then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <fieldset>
          <legend>Sign up</legend>
          <label htmlFor="firstName" className={styles.inputLabel}>
            First name
          </label>
          <Field
            component={Input}
            styleClass={styles.formInput}
            type="text"
            name="firstName"
            placeholder="First Name"
          />

          <label htmlFor="lastName" className={styles.inputLabel}>
            Last name
          </label>
          <Field component={Input} styleClass={styles.formInput} type="text" name="lastName" placeholder="Last Name" />

          <label htmlFor="username" className={styles.inputLabel}>
            Username
          </label>
          <Field
            component={Input}
            styleClass={styles.formInput}
            type="text"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
            placeholder="Username"
          />

          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <Field
            component={Input}
            styleClass={styles.formInput}
            type="password"
            name="password"
            placeholder="Password"
            validate={[required, passwordLength, isTrimmed]}
          />

          <label htmlFor="passwordConfirm" className={styles.inputLabel}>
            Confirm password
          </label>
          <Field
            component={Input}
            styleClass={styles.formInput}
            type="password"
            name="passwordConfirm"
            validate={[required, nonEmpty, matchesPassword]}
            placeholder="Confirm Password"
          />
          <button className={buttonStyles.form} type="submit" disabled={this.props.pristine || this.props.submitting}>
            SUBMIT
          </button>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
