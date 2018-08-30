import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { hideEditInfoForm } from '../../actions/profile';
import { editInfo } from '../../actions/auth';
import { connect } from 'react-redux';

import Input from '../input';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';

import { required, nonEmpty, isTrimmed } from '../../validators';

export class EditInfoForm extends React.Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    const { firstName, lastName, username } = initialValues;
    initialize({ firstName, lastName, username });
  }
  onSubmit(values) {
    const { dispatch } = this.props;
    return dispatch(editInfo(values)).then(() => dispatch(hideEditInfoForm()));
  }

  render() {
    const { error, handleSubmit, pristine, submitting, dispatch } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        {err}
        <fieldset>
          <legend>Edit Info</legend>
          <label htmlFor="firstName" className={styles.inputLabel}>
            First Name
          </label>
          <Field
            component={Input}
            styleClass={styles.formInput}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <label htmlFor="lastName" className={styles.inputLabel}>
            Last Name
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

          <button className={buttonStyles.form} type="submit" disabled={pristine || submitting}>
            SUBMIT
          </button>
          <button className={buttonStyles.form} onClick={() => dispatch(hideEditInfoForm())}>
            Cancel
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.auth.currentUser
});

const editInfoForm = connect(mapStateToProps)(EditInfoForm);

export default reduxForm({
  form: 'editInfo',
  onSubmitFail: (errors, dispatch) => dispatch(focus('editInfo', Object.keys(errors)[0]))
})(editInfoForm);
