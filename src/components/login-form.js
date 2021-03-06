import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

import styles from './styles/forms.module.css';
import buttonStyles from './styles/buttons.module.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = <div aria-live="polite">{this.props.error}</div>;
    }
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <fieldset>
          <legend>Login</legend>
          {error}

          <div className={styles.formInputs}>
            <label htmlFor="username" className={styles.inputLabel}>
              Username
            </label>
            <Field
              styleClass={styles.formInput}
              component={Input}
              type="text"
              name="username"
              id="username"
              validate={[required, nonEmpty]}
              placeholder="Username"
            />
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <Field
              styleClass={styles.formInput}
              component={Input}
              type="password"
              name="password"
              id="password"
              validate={[required, nonEmpty]}
              placeholder="Password"
            />
            <button className={buttonStyles.form} disabled={this.props.pristine || this.props.submitting}>
              SUBMIT
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
