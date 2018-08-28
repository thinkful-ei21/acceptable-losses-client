import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import { required, nonEmpty } from '../../validators';
import { getAccounts, updateAccount, toggleEdit } from '../../actions/accounts';

import Input from '../input';

export class AccountEdit extends React.Component {
  componentDidMount() {
    const { url, frequency, name, nextDue, reminder } = this.props.selectedAccount;
    const { initialize } = this.props;
    initialize({
      url,
      frequency,
      name,
      dueDate: nextDue.dueDate,
      reminder
    });
  }

  onSubmit(values) {
    const { id } = this.props.selectedAccount;
    const { dispatch } = this.props;
    return this.props
      .dispatch(updateAccount(values, id))
      .then(() => dispatch(getAccounts()))
      .then(() => dispatch(toggleEdit()));
  }

  render() {
    let err;
    const { handleSubmit, dispatch, error, pristine, submitting } = this.props;
    const { url, frequency, name, nextDue, reminder } = this.props.selectedAccount;

    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }

    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="name">Name:</label>
        <Field component={Input} type="text" name="name" value={name} validate={[required, nonEmpty]} />
        <label htmlFor="url">Website:</label>
        <Field component={Input} type="text" name="url" value={url} />
        <label htmlFor="frequency">Frequency:</label>
        <Field name="frequency" component="select" validate={required} required>
         <option value="one-time">One Time</option>
         <option value="monthly">Monthly</option>
         <option value="quarterly">Quarterly</option>
         <option value="semi-annually">Semi-Annually</option>
         <option value="annually">Annual</option>
       </Field>
        <label htmlFor="duedate">Due Date: {moment(nextDue.dueDate).format('MMM Do, YYYY')}</label>
        <Field component={Input} type="date" name="dueDate" value={nextDue.dueDate} />
        <label htmlFor="reminder">Reminder:</label>
        <Field name="reminder" component="select" value={reminder} required>
          <option value="no-reminder">No Reminder</option>
          <option value="same-day">Same Day</option>
          <option value="day-before">Day Before</option>
          <option value="week-before">Week Before</option>
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
