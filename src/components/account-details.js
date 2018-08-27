import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { updateAccount, deleteAccount, toggleEdit, payBill } from '../actions/accounts';
import moment from 'moment';
import AccountEdit from './account-edit-form'




export class AccountView extends React.Component {

  onSubmit(value) {
    let account = this.props.selectedAccount,
        newAccount = {
          name:account.name,
          url:value.url,
          frequency:account.frequency
        }
    return this.props
      .dispatch(updateAccount(newAccount,account.id));
  }

  render() {
    let billHistory,
      accountName,
      website,
      bills,
      nextDueBill,
      frequency,
      buttons,
      billHistoryTable,
      account= this.props.selectedAccount,
      editForm=this.props.editButtonToggle

    if(account !== null && !editForm){
      bills= account.bills

      billHistory= bills.map((bill, index) => {
        return (
          bill.isPaid ?
            (
                <tr>
                <td>{moment(bill.dueDate).format('MMM Do, YYYY')}</td>
                <td>{moment(bill.datePaid).format('MMM Do, YYYY')}</td>
                <td>$ {(bill.amount)>0 ? `${bill.amount}`: '---'}</td>
                </tr>
            ) :
            ''
        );
      })  
      billHistoryTable=  
      <table>
      <th>Bill History</th>
      <tr>
        <th>Due Date</th>
        <th>Date Paid</th>
        <th className="amountRow">Amount</th>
      </tr>
      {billHistory}
      </table>
      accountName= account.name

      let nextDueDate= moment(account.nextDue.dueDate).format('MMM Do, YYYY'),
          nextDueAmount= Number(account.nextDue.amount).toFixed(2);

      frequency= <p>Frequency:{account.frequency}</p>
      nextDueBill= <p>Next due: {nextDueDate} .... $ {(account.nextDue.amount)> 0 ?  `${nextDueAmount}` : `---`}</p>
      buttons= (
        <div>
          <button onClick= {e=>{
            e.preventDefault();
            return this.props.dispatch(payBill(account.nextDue, account.id))
            }
            }>Mark as Paid</button>
          <button className="edit-button" onClick= {e=> this.props.dispatch(toggleEdit())}>Edit</button>
          <button className="delete-button" onClick= {e=> this.props.dispatch(deleteAccount(account.id))}>Delete</button>
        </div>
      );
    }
    if (account !== null && editForm) {
      nextDueBill = <AccountEdit/>
    }
    if (account !== null && account.url) {
      website =<a target='_blank' href={account.url} className="button">Pay Here</a>
    }
    if (account !==null && !account.url && !editForm) {
      website = (
        <form id="website" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor="website" />
          <Field component={Input} type="text" name="url" placeholder="add website" />
          <button type="submit" disabled={this.props.pristine || this.props.submitting}>Save</button>
        </form>
      );
    }
    return (
      <div className="accountview">
        <h3>{accountName}</h3>
        {buttons}
        {website}
        {frequency}
        {nextDueBill}
        {billHistoryTable}
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
