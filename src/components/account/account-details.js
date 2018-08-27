import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import moment from 'moment';

import { updateAccount, deleteAccount, toggleEdit, payBill } from '../../actions/accounts';
import AccountEdit from './account-edit-form';

import Input from '../input';

export class AccountView extends React.Component {
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

  render() {
    const { selectedAccount, editButtonToggle, dispatch, handleSubmit, pristine, submitting } = this.props;
    let billHistory,
      accountName,
      website,
      nextDueBill,
      frequency,
      buttons,
      account = selectedAccount,
      editForm = editButtonToggle;

    if (account !== null && !editForm) {
      billHistory = account.bills.map((bill, index) => {
        return bill.isPaid ? (
          <li key={index}>
            <p>
              <span>Due: {moment(bill.dueDate).format('MMM Do, YYYY')}</span>
              <span>Paid: {moment(bill.datePaid).format('MMM Do, YYYY')}</span>
              <span>${bill.amount}</span>
            </p>
          </li>
        ) : (
          ''
        );
      }); //---add date paid
      accountName = account.name;

      let nextDueDate = moment(account.nextDue.dueDate).format('MMM Do, YYYY'),
        nextDueAmount = Number(account.nextDue.amount).toFixed(2);

      frequency = account.frequency;
      nextDueBill = (
        <section>
          <h3>Next due: </h3>
          <p>
            {nextDueDate} -- ${!isNaN(account.nextDue.amount) ? `${nextDueAmount} --- ${frequency}` : ' ---'}
          </p>
        </section>
      );
      buttons = (
        <div>
          <button
            onClick={e => {
              e.preventDefault();
              return dispatch(payBill(account.nextDue, account.id));
            }}
          >
            Mark as Paid
          </button>
          <button className="edit-button" onClick={e => dispatch(toggleEdit())}>
            Edit
          </button>
          <button className="delete-button" onClick={e => dispatch(deleteAccount(account.id))}>
            Delete
          </button>
        </div>
      );
    }
    if (account !== null && editForm) {
      nextDueBill = <AccountEdit />;
    }
    if (account !== null && account.url) {
      website = (
        <button target="_blank" href={account.url}>
          Pay here!
        </button>
      );
    }
    if (account !== null && !account.url && !editForm) {
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
      <div className="accountview">
        <h2>{accountName}</h2>
        {nextDueBill}
        <div>{website}</div>
        {buttons}
        <ul>{billHistory}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    editButtonToggle: state.accounts.editButtonToggle,
    selectedAccount: state.accounts.account
  };
};

const accountView = connect(mapStateToProps)(AccountView);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(accountView);
