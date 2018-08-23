import React from 'react';
import { connect } from 'react-redux';
import AccountCard from './account-card';
import AccountView from './account-details';
import requiresLogin from './require-login';
import SearchBar from './search-bar';
import { getAccount, getAccounts } from '../actions/accounts';

export class Accounts extends React.Component {
  componentDidMount(){
    this.props.dispatch(getAccounts())
  }

  showDetailed(id) {
    this.props.dispatch(getAccount(id));
  }

  render() {

    let accounts=this.props.accounts.filter(item =>
      item.name.toLowerCase().includes(this.props.searchTerm) ||
      item.url.toLowerCase().includes(this.props.searchTerm) ||
      item.bills.find(item => item.dueDate.includes(this.props.searchTerm)) ||
      item.bills.find(item => item.frequency === this.props.searchTerm) ||
      item.bills.find(item => item.amount === this.props.searchTerm))

    let accountResults;
    let accountsSorted;
    if (accounts) {
      console.log(accounts +'accounts')
      accountsSorted = accounts.sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      if (this.props.alphaSort) {accountsSorted = accountsSorted.reverse();}
      accountResults = accountsSorted.map((account) => {console.log('got here'); return (
        <AccountCard showDetailed={id => this.showDetailed(id)} key={account.id} {...account} />
      )});
    }
    console.log(accountResults);
    return (
      <div className="accounts">
        <h3>Accounts</h3>
        <SearchBar />
        <AccountView />
        <p>---------------------------------------------------------------------------</p>
        {accountResults}
      </div>
    );
  }
}

const mapStateToProps = state => {console.log('getting state')

  return {
    alphaSort: state.accounts.alphaSort,
    dateSort: state.accounts.dateSort,
    accounts: state.accounts.accounts,
    searchTerm:state.accounts.searchTerm
  };
};

export default requiresLogin()(connect(mapStateToProps)(Accounts));
