import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './require-login';

export class AccountView extends React.Component {
  render() {
    let billHistory;
    let accountName;
    if(this.props.selectedAccount){
      accountName= this.props.selectedAccount.name
    }
    if(this.props.selectedAccount.bills.length>1){
        billHistory= this.props.selectedAccount.bills.map((bill) =>
      <li>{bill.dueDate}{bill.amount}{bill.isPaid}</li>
      );
    }
    return (
      <div className="accountview">
        <h2>{accountName}</h2>
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

export default requiresLogin()(connect(mapStateToProps)(AccountView));
