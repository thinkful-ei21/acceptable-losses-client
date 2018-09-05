import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
// import moment from 'moment';

import { required, nonEmpty } from '../../validators';
import { updateAccount, toggleEdit } from '../../actions/accounts';

import Input from '../input';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';


export class AccountEdit extends React.Component {
  componentDidMount() {
    const { url, frequency, name, nextDue, reminder } = this.props.selectedAccount;
    const { initialize } = this.props;
    initialize({
      url,
      frequency,
      name,
      dueDate: nextDue ? new Date(nextDue.dueDate).toISOString().substr(0, 10): '',
      reminder,
      amount: nextDue ? nextDue.amount: 0
    });
  }

  onSubmit(values) {
    const { id } = this.props.selectedAccount;
    const { dispatch } = this.props;
    return this.props.dispatch(updateAccount(values, id)).then(() => dispatch(toggleEdit()));
  }

  render() {
    let err;
    const { handleSubmit, dispatch, error, pristine, submitting } = this.props;
    const { url, frequency, name, nextDue, reminder, amount } = this.props.selectedAccount;

    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }

    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <fieldset>
          <legend className={styles.editFormLegend}>Update Bill</legend>
          {err}
          <label htmlFor="name" className={styles.editFormLabel}>
            Name:
          </label>
          <Field component={Input}
            type="text"
            name="name"
            value={name}
            validate={[required, nonEmpty]}
            styleClass={`${styles.formInput} ${styles.editFormInput}`}
          />

          <label htmlFor="url" className={styles.editFormLabel}>
            Website:
          </label>
          <Field component={Input}
            type="text"
            name="url"
            value={url}
            styleClass={`${styles.formInput} ${styles.editFormInput}`}
          />

          <label htmlFor="amount" className={styles.editFormLabel}>
            Amount:
          </label>
          <Field component={Input}
            type="number"
            name="amount"
<<<<<<< HEAD
            value={amount ? amount : 0}
            styleClass={styles.formInput}
=======
            value={amount}
            styleClass={`${styles.formInput} ${styles.editFormInput}`}
>>>>>>> fa61721dc2cb24267341f92c8fbc3d80f716088d
          />

          <label htmlFor="frequency" className={styles.editFormLabel}>
            Frequency:
          </label>
          <Field name="frequency"
            component="select"
            value={frequency}
            validate={[required, nonEmpty]}
            required
            className={`${styles.dropDown} ${`${styles.formInput} ${styles.editFormInput}`} ${styles.editDropDown}`}
          >
            <option hidden>Frequency</option>
            <option value="One Time">One Time</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Semi-Annually">Semi-Annually</option>
            <option value="Annually">Annually</option>
          </Field>

          <label htmlFor="dueDate"  className={styles.editFormLabel}>
            Due Date:
          </label>
          <Field
            id="dateField"
            component={Input}
            type="date"
            name="dueDate"
<<<<<<< HEAD
            value={nextDue ? new Date(nextDue.dueDate).toISOString().substr(0, 10): ''}
            styleClass={styles.formInput}
=======
            value={new Date(nextDue.dueDate).toISOString().substr(0, 10)}
            styleClass={`${styles.formInput} ${styles.editFormInput}`}
>>>>>>> fa61721dc2cb24267341f92c8fbc3d80f716088d
          />

          <label htmlFor="reminder" className={styles.editFormLabel}>
            Reminder:
          </label>
          <Field name="reminder"
            component="select"
            value={reminder}
            validate={[required, nonEmpty]}
            required
            className={`${styles.dropDown} ${`${styles.formInput} ${styles.editFormInput}`} ${styles.editDropDown}`}
          >
            <option hidden>Reminder</option>
            <option value="No Reminder">No Reminder</option>
            <option value="Same Day">Same Day</option>
            <option value="Day Before">Day Before</option>
            <option value="Week Before">Week Before</option>
          </Field>

          <div className={styles.editButtons}>
            <button type="submit" disabled={pristine || submitting}  className={`${buttonStyles.updateForm} ${styles.editUpdateButton}`}>
              Update
            </button>
            <button className={`${buttonStyles.cancelForm} ${styles.editCancelButton}`} onClick={e => dispatch(toggleEdit())}>Cancel</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  selectedAccount: state.accounts.account
});

const accountEdit = connect(mapStateToProps)(AccountEdit);

export default reduxForm({
  form: 'edit',
  onSubmitFail: (errors, dispatch) => dispatch(focus('edit', Object.keys(errors)[0]))
})(accountEdit);
