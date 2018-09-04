import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';

import { togglePay, payBill, getDaysBills } from '../../actions/accounts';

import Input from '../input';

class AccountPay extends React.Component {
  componentDidMount() {
    const { nextDue } = this.props.selectedAccount;
    const { initialize } = this.props;
    initialize({
      amount: nextDue.amount
    });
  }

  submitPayment() {
    if (this.props.payToggle) {
      this.props.payToggle(false);
    }
    return;
  }

  cancel() {
    const { dispatch, payToggle } = this.props;
    dispatch(togglePay(null));
    if (payToggle) {
      payToggle(false);
    }
  }

  onSubmit(value) {
    const { dispatch, selectedAccount, selectedDay } = this.props;
    let { dueDate } = selectedAccount.nextDue;
    let updatedAccount = { amount: value.amount, dueDate };
    this.submitPayment();
    return dispatch(payBill(updatedAccount, selectedAccount.id))
      .then(() => dispatch(togglePay(null)))
      .then(() => dispatch(getDaysBills(selectedDay)));
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <section>
        <form id="amount" onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor="amount" />
          <Field component={Input} type="number" value={this.props.selectedAccount.amount} name="amount" />
          <button type="submit" disabled={submitting}>
            Confirm Payment
          </button>
          <button onClick={() => this.cancel()}>Cancel</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  selectedDay: state.accounts.selectedDay,
  selectedAccount: state.accounts.account
});

const accountPay = connect(mapStateToProps)(AccountPay);

export default reduxForm({
  form: 'amount',
  onSubmitFail: (errors, dispatch) => dispatch(focus('amounts', Object.keys(errors)[0]))
})(accountPay);
