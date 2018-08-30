import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import moment from 'moment';

import { updateAccount, deleteAccount, toggleEdit, payBill, toggleDelete, togglePay } from '../../actions/accounts';
import AccountEdit from './account-edit-form';
import AccountPay from './account-pay-form';


import Input from '../input';

export class AccountDetails extends React.Component {
  onSubmit(value) {
    const { selectedAccount, dispatch } = this.props;
    const { name, frequency, id,reminder } = selectedAccount;
    const newAccount = {
      reminder,
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
    const { selectedAccount, editButtonToggle, dispatch, handleSubmit, pristine, submitting, deleteButtonToggle, payButtonToggle } = this.props;
    const { name, nextDue, id, bills, url, reminder} = selectedAccount;

    let billHistory,
      accountName,
      website,
      nextDueBill,
      frequency,
      buttons,
      reminderFrequency,
      billHistoryTable,
      account = selectedAccount,
      editForm = editButtonToggle;

    if (!editForm) {
      billHistory = bills.map((bill, index) => {
        return bill.isPaid ? (
          <tr key={index}>
            <td>{moment(bill.dueDate).format('MMM Do, YYYY')}</td>
            <td>{moment(bill.datePaid).format('MMM Do, YYYY')}</td>
            <td>$ {bill.amount > 0 ? `${bill.amount}` : '---'}</td>
          </tr>
        ) : (
          <tr key={index}>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      });

      billHistoryTable = (
        <table>
          <thead>
            <tr>
              <th>Bill History</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Due Date</th>
              <th>Date Paid</th>
              <th>Amount</th>
            </tr>
            {billHistory}
          </tbody>
        </table>
      );

      accountName = name;
      reminderFrequency= <p>Reminder: {reminder}</p> ;
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
          Next Due: {nextDueDate} <span>$ {nextDue.amount > 0 ? `${nextDueAmount}` : `---`}</span>
        </p>
      );

      buttons = (
        <div>
          {payButtonToggle===id? <AccountPay/>:<button onClick={() => dispatch(togglePay(id))}>Mark as Paid</button>}      
          <button onClick={() => dispatch(toggleEdit())}>Edit</button>
          {deleteButtonToggle ? <button onClick={() => dispatch(toggleDelete())}>Cancel Delete</button>: <button onClick={() => dispatch(toggleDelete())}>Delete</button>}
          {deleteButtonToggle ? <button onClick={()=> {return dispatch(deleteAccount(id)).then(() =>dispatch(toggleDelete())) }}>Confirm Delete</button>: ''}
        </div>
      );
    }

    if (editForm) {
      nextDueBill = <AccountEdit />;
    }

    if (url) {
      website = (
        <a target="_blank" href={url}>
          Pay Here
        </a>
      );
    }

    if (!url && !editForm) {
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
        {reminderFrequency}
        {nextDueBill}
        {billHistoryTable}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  deleteButtonToggle: state.accounts.deleteButtonToggle,
  payButtonToggle: state.accounts.payButtonToggle,
  editButtonToggle: state.accounts.editButtonToggle,
  selectedAccount: state.accounts.account
});

const accountDetails = connect(mapStateToProps)(AccountDetails);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(accountDetails);
