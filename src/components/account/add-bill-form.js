import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import { createBill } from '../../actions/accounts';
import { required, nonEmpty } from '../../validators';
import { getAccounts } from '../../actions/accounts';

import Input from '../input';

export class AddBillForm extends React.Component {
  componentWillMount() {
    this.props.initialize({ url: null, amount: null });
  }

  onSubmit(values) {
    return this.props
      .dispatch(createBill(values))
      .then(() => this.props.dispatch(getAccounts()))
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    const { handleSubmit, error, pristine, submitting } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form className="bill-form" onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="name">Name:</label>
        <Field component={Input} type="text" name="name" validate={[required, nonEmpty]} placeholder="Netflix" />
        <label htmlFor="url">Website:</label>
        <Field component={Input} type="text" name="url" placeholder="Netflix.com/payments" />
        <label htmlFor="amount">Amount:</label>
        <Field component={Input} type="number" name="amount" placeholder="0.00" />
        <label htmlFor="duedate">Due Date:</label>
        <Field component={Input} type="date" name="dueDate" validate={[required, nonEmpty]} />
        <label htmlFor="frequency">Frequency:</label>
        <Field name="frequency" component="select" validate={required} required>
          <option value="One Time">One Time</option>
          <option value="Monthly">Monthly</option>
          <option value="6 Months">6 Months</option>
          <option value="Annual">Annual</option>
        </Field>
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
        {err}
      </form>
    );
  }
}

export default reduxForm({
  form: 'bill',
  onSubmitFail: (errors, dispatch) => dispatch(focus('bill', Object.keys(errors)[0]))
})(AddBillForm);
