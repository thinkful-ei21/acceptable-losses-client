import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import moment from 'moment';

import {
  updateAccount,
  deleteAccount,
  toggleEdit,
  payBill,
  toggleDelete,
  togglePay,
  clearAccount
} from '../../actions/accounts';
import AccountEdit from './account-edit-form';
import AccountPay from './account-pay-form';

import Input from '../input';

import styles from '../styles/accountDetails.module.css';
import buttonStyles from '../styles/buttons.module.css';

export class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPayment: false
    };
  }

  onSubmit(value) {
    const { selectedAccount, dispatch } = this.props;
    const { name, frequency, id, reminder } = selectedAccount;
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
    const {
      selectedAccount,
      editButtonToggle,
      dispatch,
      handleSubmit,
      pristine,
      submitting,
      deleteButtonToggle,
      payButtonToggle
    } = this.props;
    const { name, nextDue, id, bills, url, reminder } = selectedAccount;

    let billHistory,
      accountName,
      payButtons,
      // website,
      addPaySiteForm,
      nextDueBill,
      frequency,
      editingButtons,
      reminderFrequency,
      billHistoryTable,
      account = selectedAccount,
      editForm = editButtonToggle,
      showSingleAction;

    addPaySiteForm = (
      <form id="website" onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="website" />
        <Field component={Input} type="text" name="url" placeholder="add website" />
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
      </form>
    );

    if (!editForm && !deleteButtonToggle && !payButtonToggle) {
      billHistory = bills.map((bill, index) => {
        return bill.isPaid ? (
          <tr key={index}>
            <td>{moment(bill.dueDate).format('MMM Do, YYYY')}</td>
            <td>{moment(bill.datePaid).format('MMM Do, YYYY')}</td>
            <td>${bill.amount > 0 ? `${bill.amount}` : '---'}</td>
          </tr>
        ) : (
          <tr key={index}>
            <td />
            <td />
            <td />
          </tr>
        );
      });

      billHistoryTable = (
        <table className={styles.billHistory}>
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
      reminderFrequency = (
        <React.Fragment>
          <p className={styles.label}>Reminder:</p>
          <p className={styles.details}>{reminder}</p>
        </React.Fragment>
      );

      let nextDueDate = moment(nextDue.dueDate).format('MMM Do, YYYY'),
        nextDueAmount = Number(nextDue.amount).toFixed(2);

      frequency = (
        <React.Fragment>
          <p className={styles.label}>Frequency:</p>
          <p className={styles.details}>{account.frequency}</p>
        </React.Fragment>
      );

      nextDueBill = (
        <React.Fragment>
          <p className={styles.label}>Next Due:</p>
          <p className={styles.details}>
            {nextDueDate}
            <span>${nextDue.amount > 0 ? `${nextDueAmount}` : `---`}</span>
          </p>
        </React.Fragment>
      );

      editingButtons = (
        <div>
          <button onClick={() => dispatch(toggleEdit())} className={buttonStyles.editting}>
            <img src={require('../../assets/edit.svg')} alt="Edit icon" />
          </button>

          <button onClick={() => dispatch(clearAccount())} className={buttonStyles.editting}>
            back
            {/* <img src={require('../../assets/edit.svg')} alt="Back icon"/> */}
          </button>

          <button onClick={() => dispatch(toggleDelete())}
            className={buttonStyles.editting}
          >
            <img src={require('../../assets/delete.svg')} alt="Delete icon"/>
          </button>
        </div>
      );

      payButtons = (
        <div>
          <button className={`${buttonStyles.markAsPaid} ${styles.markAsPaid}`}
            onClick={() => dispatch(togglePay(id))}
          >
            Mark as Paid
          </button>
          {url ? (
            <button className={`${buttonStyles.payHere} ${styles.payHere}`}>
              <a target="_blank" href={url}>
                Pay Here
              </a>
            </button>
          ) : (
            addPaySiteForm
          )}
        </div>
      );
    }

    if (editForm) {
      showSingleAction = <AccountEdit />;
    }

    if (deleteButtonToggle) {
      showSingleAction = (
        <React.Fragment>
          <p>Are you sure you want to delete this account?</p>
          <button
            onClick={() => {
              return dispatch(deleteAccount(id)).then(() => dispatch(toggleDelete()));
            }}
          >
            Confirm Delete
          </button>
          <button onClick={() => dispatch(toggleDelete())}>Cancel Delete</button>
        </React.Fragment>
      );
    }

    if (payButtonToggle) {
      showSingleAction = (
        <React.Fragment>
          <p>How much did you pay?</p>
          <AccountPay />
        </React.Fragment>
      );
    }
    // if (url) {
    //   website = (
    //     <a target="_blank" href={url}>
    //       Pay Here
    //     </a>
    //   );
    // }

    // if (!url && !editForm) {
    //   website = (
    //     <form id="website" onSubmit={handleSubmit(values => this.onSubmit(values))}>
    //       <label htmlFor="website" />
    //       <Field component={Input} type="text" name="url" placeholder="add website" />
    //       <button type="submit" disabled={pristine || submitting}>
    //         Save
    //       </button>
    //     </form>
    //   );
    // }

    return (
      <section className={styles.detailPage}>
        <div className={styles.allContent}>
          {showSingleAction}
          {editingButtons}
          <h3 className={styles.h3}>{accountName}</h3>
          {payButtons}
          {nextDueBill}
          {/* {website} */}
          {frequency}
          {reminderFrequency}
          {billHistoryTable}
        </div>
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
