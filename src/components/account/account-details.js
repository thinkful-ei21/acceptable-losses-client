import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import moment from 'moment';

import { updateAccount, deleteAccount, toggleEdit, payBill } from '../../actions/accounts';
import AccountEdit from './account-edit-form';

import Input from '../input';

export class AccountDetails extends React.Component {
  onSubmit(value) {
    const { selectedAccount, dispatch } = this.props;
    const { name, frequency, id } = selectedAccount;
    const newAccount = {
      name,
      url: value.url,
      frequency
    };
    return dispatch(updateAccount(newAccount, id));
  }

  whenClicked(e) {
    const { dispatch, selectedAccount } = this.props;
    e.preventDefault();
    return dispatch(payBill(selectedAccount.nextDue, selectedAccount.id));
  }

  render() {
    const { selectedAccount, editButtonToggle, dispatch, handleSubmit, pristine, submitting } = this.props;
    const { name, nextDue, id, bills, url } = selectedAccount;
    let billHistory,
      accountName,
      website,
      nextDueBill,
      frequency,
      buttons,
      billHistoryTable,
      account = selectedAccount,
      editForm = editButtonToggle;

    if (account !== null && !editForm) {
      billHistory = bills.map(bill => {
        return bill.isPaid ? (
          <tr>
            <td>{moment(bill.dueDate).format('MMM Do, YYYY')}</td>
            <td>{moment(bill.datePaid).format('MMM Do, YYYY')}</td>
            <td>$ {bill.amount > 0 ? `${bill.amount}` : '---'}</td>
          </tr>
        ) : (
          ''
        );
      });

      billHistoryTable = (
        <table>
          <th>Bill History</th>
          <tr>
            <th>Due Date</th>
            <th>Date Paid</th>
            <th>Amount</th>
          </tr>
          {billHistory}
        </table>
      );

      accountName = name;

      let nextDueDate = moment(nextDue.dueDate).format('MMM Do, YYYY'),
        nextDueAmount = Number(nextDue.amount).toFixed(2);

      frequency = (
        <p>
          Frequency:
          {account.frequency}
        </p>
      );

      nextDueBill = (
        <p>
          Next due: {nextDueDate} <span>$ {nextDue.amount > 0 ? `${nextDueAmount}` : `---`}</span>
        </p>
      );

      buttons = (
        <div>
          <button onClick={e => this.whenClicked(e)}>Mark as Paid</button>
          <button onClick={() => dispatch(toggleEdit())}>Edit</button>
          <button onClick={() => dispatch(deleteAccount(id))}>Delete</button>
        </div>
      );
    }

    if (account !== null && editForm) {
      nextDueBill = <AccountEdit />;
    }

    if (account !== null && url) {
      website = (
        <a target="_blank" href={url}>
          Pay Here
        </a>
      );
    }

    if (account !== null && !url && !editForm) {
      website = (
        <form id="website" onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor="website" />
          <Field component={Input} type="text" name="url" placeholder="add website" />
          <button type="submit" disabled={pristine || submitting}>
            Save
          </button>
        </form>
      );
    }

    return (
      <section>
        <h3>{accountName}</h3>
        {buttons}
        {website}
        {frequency}
        {nextDueBill}
        {billHistoryTable}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  editButtonToggle: state.accounts.editButtonToggle,
  selectedAccount: state.accounts.account
});

const accountDetails = connect(mapStateToProps)(AccountDetails);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(accountDetails);
