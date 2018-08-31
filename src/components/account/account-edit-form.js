import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import { required, nonEmpty } from '../../validators';
import { updateAccount, toggleEdit } from '../../actions/accounts';

import Input from '../input';

export class AccountEdit extends React.Component {
  componentDidMount() {
    const { url, frequency, name, nextDue, reminder,amount } = this.props.selectedAccount;
    const { initialize } = this.props;
    initialize({
      url,
      frequency,
      name,
      dueDate:new Date(nextDue.dueDate).toISOString().substr(0, 10),
      reminder,
      amount:nextDue.amount
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
        <label htmlFor="name">Name:</label>
        <Field component={Input} type="text" name="name" value={name} validate={[required, nonEmpty]} />
        <label htmlFor="url">Website:</label>
        <Field component={Input} type="text" name="url" value={url} />
        <label htmlFor="amount">
              Amount:
            </label>
            <Field component={Input} type="number" name="amount" value={amount} />
        <label htmlFor="frequency" />
        <Field name="frequency" component="select" value={frequency} validate={[required, nonEmpty]} required>
          <option hidden>Frequency</option>
          <option value="One Time">One Time</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Semi-Annually">Semi-Annually</option>
          <option value="Annually">Annually</option>
        </Field>
        <label htmlFor="dueDate">Due Date:</label>
        <Field id="dateField"component={Input} type="date" name="dueDate" value={new Date(nextDue.dueDate).toISOString().substr(0, 10)} />
        <label htmlFor="reminder" />
        <Field name="reminder" component="select" value={reminder} validate={[required, nonEmpty]} required>
          <option hidden>Reminder</option>
          <option value="No Reminder">No Reminder</option>
          <option value="Same Day">Same Day</option>
          <option value="Day Before">Day Before</option>
          <option value="Week Before">Week Before</option>
        </Field>
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
        <button onClick={e => dispatch(toggleEdit())}>cancel</button>
        {err}
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
