import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import { required, nonEmpty } from '../../validators';
import { getAccounts, updateAccount, toggleEdit } from '../../actions/accounts';

import Input from '../input';

export class AccountEdit extends React.Component {
  componentDidMount() {
    const { url, frequency, name, nextDue } = this.props.selectedAccount;
    const { initialize } = this.props;
    initialize({
      url,
      frequency,
      name,
      dueDate: nextDue.dueDate
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
    const { url, frequency, name, nextDue } = this.props.selectedAccount;

    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }

    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="name">Name:</label>
        <Field component={Input} type="text" name="name" value={name} validate={[required, nonEmpty]} />
        <label htmlFor="url">Website:</label>
        <Field component={Input} type="text" name="url" value={url} />
        <label htmlFor="duedate">Due Date: {moment(nextDue.dueDate).format('MMM Do, YYYY')}</label>
        <Field component={Input} type="date" name="dueDate" value={nextDue.dueDate} />
        <label htmlFor="frequency">Frequency:</label>
        <Field name="frequency" component="select" value={frequency} required>
          <option value="One Time">One Time</option>
          <option value="Monthly">Monthly</option>
          <option value="6 Months">6 Months</option>
          <option value="Annual">Annual</option>
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
