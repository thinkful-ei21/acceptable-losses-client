import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { changePassword, hideChangePasswordForm } from '../../actions/profile';
import { connect } from 'react-redux';

import Input from '../input';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';

import { login } from '../../actions/auth';

import { required, nonEmpty, matches, length, isTrimmed } from '../../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('newPassword');

export class ChangePasswordForm extends React.Component {
  onSubmit(values) {
    const { oldPassword, newPassword } = values;
    const { dispatch, user } = this.props;
    return dispatch(changePassword({ oldPassword, newPassword })).then(() =>
      dispatch(login(user.username, newPassword))
    );
  }

  render() {
    const { handleSubmit, pristine, submitting, dispatch } = this.props;
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))} className={styles.settingsForm}>
        <fieldset>
          <legend className={styles.settingsLegend}>Change Password</legend>
          <div className={styles.formInputs}>
            <label htmlFor="oldPassword" className={styles.inputLabel}>
              Old Password
            </label>
            <Field
              component={Input}
              styleClass={`${styles.formInput} ${styles.settingsInput}`}
              type="password"
              name="oldPassword"
              validate={[required, passwordLength, isTrimmed]}
              placeholder="Old Password"
              // styleClass={styles.settingsInput}
            />
            <label htmlFor="newPassword" className={styles.inputLabel}>
              New Password
            </label>
            <Field
              component={Input}
              styleClass={`${styles.formInput} ${styles.settingsInput}`}
              type="password"
              name="newPassword"
              validate={[required, passwordLength, isTrimmed]}
              placeholder="New Password"
              // styleClass={styles.settingsInput}
            />
            <label htmlFor="confirmPassword" className={styles.inputLabel}>
              Confirm New Password
            </label>
            <Field
              component={Input}
              styleClass={`${styles.formInput} ${styles.settingsInput}`}
              type="password"
              name="confirmPassword"
              validate={[required, nonEmpty, matchesPassword]}
              placeholder="Confirm New Password"
              // styleClass={styles.settingsInput}
            />

            <div className={styles.settingsFormButtons}>
              <button className={buttonStyles.form} type="submit" disabled={pristine || submitting}>
                SUBMIT
              </button>
              <button className={buttonStyles.form} onClick={() => dispatch(hideChangePasswordForm())}>
                Cancel
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

const changePasswordForm = connect(mapStateToProps)(ChangePasswordForm);

export default reduxForm({
  form: 'changePassword',
  onSubmitFail: (errors, dispatch) => dispatch(focus('changePassword', Object.keys(errors)[0]))
})(changePasswordForm);
