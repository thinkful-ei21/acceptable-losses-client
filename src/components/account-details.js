import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import Input from './input';
import { updateAccount } from '../actions/accounts';


export class AccountView extends React.Component {

  onSubmit(value) {
    let account= this.props.selectedAccount
    let newAccount= {name:account.name, url:value.url, frequency:account.frequency}
    return this.props.dispatch(updateAccount(newAccount,account.id));
  }

  render() {
    let billHistory, 
      accountName,
      website,
      bills,
      nextDueBill,
      frequency,
      account= this.props.selectedAccount

    if(account !== null){
      bills= account.bills
      billHistory= bills.map((bill) => {if(bill.isPaid){ return <li>{bill.dueDate.slice(0,10)} ------ {bill.amount}</li>}})    //---add date paid
      accountName= account.name
      let nextDueDate= account.nextDue.dueDate
      let nextDueAmount= Number(account.nextDue.amount).toFixed(2)
      nextDueBill= <h3>Next due:{nextDueDate} -- ${!isNaN(account.nextDue.amount) ?  nextDueAmount : ' ---'}</h3>
      frequency= account.frequency
    }
    if(account !== null && account.url){
      website= <button target="_blank" href={account.url}>Pay here!</button>
    }
    if(account !==null && !account.url){
      website= 
      <form id="website" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="website" />
        <Field component={Input} type="text" name="url" placeholder="add website" />
        <button type="submit" disabled={this.props.pristine || this.props.submitting}>save</button>
      </form>
    }
    return (
      <div className="accountview">
        <h2>{accountName}</h2>
        {nextDueBill}
        <div>{website}</div>
        <h3>{frequency}</h3>
        <ul>
          {billHistory}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedAccount: state.accounts.account
  };
};

const accountView = connect(mapStateToProps)(AccountView);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(accountView);


