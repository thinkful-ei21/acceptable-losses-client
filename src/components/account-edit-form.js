import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { getAccounts, updateAccount, toggleEdit} from '../actions/accounts';
import { connect } from 'react-redux';
import moment from 'moment';


export class AccountEdit extends React.Component {
  componentDidMount() {
    let account= this.props.selectedAccount
    this.props.initialize({ url: account.url, frequency: account.frequency, name:account.name,dueDate:account.nextDue.dueDate });
  }

  onSubmit(values) {
    console.log('the edit form submitted')
    // const {name, website, amount, duedate, frequency} = values;
    return this.props
      .dispatch(updateAccount(values,this.props.selectedAccount.id))
      .then(() => this.props.dispatch(getAccounts()))
      .then(() => this.props.dispatch(toggleEdit()))

  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    let account= this.props.selectedAccount
    return (

      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="name">Name:</label>
        <Field component={Input} type="text" name="name" value={account.name}validate={[required, nonEmpty]}  />
        <label htmlFor="url">Website:</label>
        <Field component={Input} type="text" name="url" value={account.url} />
        <label htmlFor="duedate">Due Date: {moment(account.nextDue.dueDate).format('MMM Do, YYYY')}</label>
        <Field component={Input} type="date" name="dueDate" value={account.nextDue.dueDate} />
        <label htmlFor="frequency">Frequency:</label>
        <Field name="frequency" component="select" value={account.frequency} required>
          <option value="One Time">One Time</option>
          <option value="Monthly">Monthly</option>
          <option value="6 Months">6 Months</option>
          <option value="Annual">Annual</option>
        </Field>
        <button className="save-button" type="submit" disabled={this.props.pristine || this.props.submitting}>
          Save
        </button>
        <button className="edit-button" onClick= {e=> this.props.dispatch(toggleEdit())}>cancel</button>
        {error}
      </form>

    );
  }
}



const mapStateToProps = (state, props) => {
  return {
    selectedAccount: state.accounts.account
  };
};

const accountEdit = connect(mapStateToProps)(AccountEdit);

export default reduxForm({
  form: 'edit',
  onSubmitFail: (errors, dispatch) => dispatch(focus('edit', Object.keys(errors)[0]))
})(accountEdit);
