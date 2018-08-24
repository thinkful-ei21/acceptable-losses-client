import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import Input from './input';
import { updateAccount, deleteAccount, toggleEdit  } from '../actions/accounts';
import moment from 'moment';
import AccountEdit from './account-edit-form'




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
      buttons,
      account= this.props.selectedAccount,
      editForm=this.props.editButtonToggle

    if(account !== null && !editForm){
      bills= account.bills
      billHistory= bills.map((bill, index) => {if(bill.isPaid){ return ( <li key={index}> Due: {moment(bill.dueDate).format('MMM Do, YYYY')} ---- Paid: {moment(bill.datePaid).format('MMM Do, YYYY')} ------ ${bill.amount}</li>)}})    //---add date paid
      accountName= account.name
      let nextDueDate= moment(account.nextDue.dueDate).format('MMM Do, YYYY')
      let nextDueAmount= Number(account.nextDue.amount).toFixed(2)
      frequency= account.frequency
      nextDueBill= <h3>Next due:{nextDueDate} -- ${!isNaN(account.nextDue.amount) ?  `${nextDueAmount} --- ${frequency}` : ' ---'}</h3>
      buttons= 
      <div>
          <button className="edit-button" onClick= {e=> this.props.dispatch(toggleEdit())}>Edit</button>
          <button className="delete-button" onClick= {e=> this.props.dispatch(deleteAccount(account.id))}>Delete</button>
      </div>
    }
    if(account !== null && editForm){ 
      nextDueBill= <AccountEdit/>
      
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
        {buttons}
        <ul>
          {billHistory}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    editButtonToggle:state.accounts.editButtonToggle,
    selectedAccount: state.accounts.account
  };
};

const accountView = connect(mapStateToProps)(AccountView);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(accountView);


