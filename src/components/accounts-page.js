import React from 'react';
import { connect } from 'react-redux';
import AccountCard from './account-card';
import AccountView from './account-view';
import requiresLogin from './require-login';
import SearchBar from './search-bar';
import { getAccount } from '../actions/accounts';

export class Accounts extends React.Component {
<<<<<<< income
=======
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

>>>>>>> local
  showDetailed(id) {
    this.props.dispatch(getAccount(id));
  }

  render() {
<<<<<<< income
    let accountResults;
    let accountsSorted;
    if (this.props.accounts) {
      accountsSorted = this.props.accounts.sort(function(a, b) {
=======
    let accounts = this.props.accounts.filter(
      item =>
        item.name.toLowerCase().includes(this.props.searchTerm) ||
        item.url.toLowerCase().includes(this.props.searchTerm) ||
        item.bills.find(item => item.dueDate.includes(this.props.searchTerm)) ||
        item.bills.find(item => item.frequency === this.props.searchTerm) ||
        item.bills.find(item => item.amount === this.props.searchTerm)
    );

    let accountResults;
    let accountsSorted;
    if (accounts) {
      console.log(accounts + 'accounts');
      accountsSorted = accounts.sort(function(a, b) {
>>>>>>> local
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      if (this.props.alphaSort) {
        accountsSorted = accountsSorted.reverse();
      }
<<<<<<< income
      accountResults = accountsSorted.map(account => (
        <AccountCard showDetailed={id => this.showDetailed(id)} key={account.id} {...account} />
      ));
=======
      accountResults = accountsSorted.map(account => {
        console.log('got here');
        return <AccountCard showDetailed={id => this.showDetailed(id)} key={account.id} {...account} />;
      });
>>>>>>> local
    }
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

const mapStateToProps = state => {
<<<<<<< income
  return {
    alphaSort: state.accounts.alphaSort,
    dateSort: state.accounts.dateSort,
    accounts: state.accounts.accounts.filter(
      item =>
        item.name.toLowerCase().includes(state.accounts.searchTerm) ||
        item.url.toLowerCase().includes(state.accounts.searchTerm) ||
        item.bills.find(item => item.dueDate.includes(state.accounts.searchTerm)) ||
        item.bills.find(item => item.frequency === state.accounts.searchTerm) ||
        item.bills.find(item => item.amount === state.accounts.searchTerm)
    )
=======
  console.log('getting state');

  return {
    alphaSort: state.accounts.alphaSort,
    dateSort: state.accounts.dateSort,
    accounts: state.accounts.accounts,
    searchTerm: state.accounts.searchTerm
>>>>>>> local
  };
};

export default requiresLogin()(connect(mapStateToProps)(Accounts));
