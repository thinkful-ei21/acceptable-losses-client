import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import { createBill } from '../../actions/accounts';
import { required, nonEmpty } from '../../validators';
import { getAccounts } from '../../actions/accounts';

import Input from '../input';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';

export class AddBillForm extends React.Component {
  componentWillMount() {
    this.props.initialize({ url: null, amount: null });
  }

  onSubmit(values) {
    return this.props
      .dispatch(createBill(values))
      .then(() => this.props.dispatch(getAccounts()))
      .then(() => this.props.history.push('/app/dashboard'));
  }

  render() {
    const { handleSubmit, error, pristine, submitting } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form className={styles.form}
        onSubmit={handleSubmit(values => this.onSubmit(values))}
      >
        <fieldset>
          <legend>Add New Bill</legend>
          {err}

          <label htmlFor="name" className={styles.inputLabel}>
            Name:
          </label>
          <Field component={Input}
            type="text"
            name="name"
            validate={[required, nonEmpty]}
            placeholder="Netflix"
            styleClass={styles.formInput}
          />

          <label htmlFor="url" className={styles.inputLabel}>
            Website:
          </label>
          <Field component={Input}
            type="text"
            name="url"
            placeholder="Netflix.com/payments"
            styleClass={styles.formInput}
          />

          <label htmlFor="amount" className={styles.inputLabel}>
            Amount:
          </label>
          <Field component={Input}
            type="number"
            name="amount"
            placeholder="0.00"
            styleClass={styles.formInput}
          />

          <label htmlFor="frequency" className={styles.inputLabel}/>
          <Field name="frequency" component="select" validate={[required, nonEmpty]} required >
            <option hidden>Frequency</option>
            <option value="One Time">One Time</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Semi-Annually">Semi-Annually</option>
            <option value="Annually">Annually</option>
          </Field>

          <label htmlFor="dueDate" className={styles.inputLabel}>
            Due Date:
          </label>
          <Field component={Input}
            type="date"
            name="dueDate"
            validate={[required, nonEmpty]}
            styleClass={styles.formInput}
          />

          <label htmlFor="reminder" className={styles.inputLabel}/>
          <Field name="reminder" component="select" validate={[required, nonEmpty]} required>
            <option hidden>Reminder</option>
            <option value="No Reminder">No Reminder</option>
            <option value="Same Day">Same Day</option>
            <option value="Day Before">Day Before</option>
            <option value="Week Before">Week Before</option>
          </Field>

          <button type="submit" disabled={pristine || submitting} className={buttonStyles.form}>
            Save
          </button>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'bill',
  onSubmitFail: (errors, dispatch) => dispatch(focus('bill', Object.keys(errors)[0]))
})(AddBillForm);
