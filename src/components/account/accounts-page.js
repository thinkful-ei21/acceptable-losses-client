import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from '../require-login';
import { getAccounts } from '../../actions/accounts';

import SearchBar from './search-bar';

import Filters from './account-filters';
import AccountCard from './account-card';
import AccountDetails from './account-details';

export class AccountsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

  render() {
    const { searchTerm, filter } = this.props;
    let accounts = this.props.accounts.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.url.toLowerCase().includes(searchTerm) ||
        item.bills.find(item => item.dueDate.includes(searchTerm)) ||
        item.bills.find(item => item.frequency === searchTerm) ||
        item.bills.find(item => item.amount === searchTerm)
    );

    let accountResults;
    let accountsSorted;
    if (accounts) {
      if (filter === 'abc')
        accountsSorted = accounts.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      if (filter === 'newest') {
        accountsSorted = accounts.sort((a, b) => {
          var dateA = new Date(a.nextDue.dueDate);
          var dateB = new Date(b.nextDue.dueDate);
          return dateA - dateB;
        });
      }
      if (filter === 'oldest') {
        accountsSorted = accounts.sort((a, b) => {
          var dateA = new Date(a.nextDue.dueDate);
          var dateB = new Date(b.nextDue.dueDate);
          return dateB - dateA;
        });
      }
      accountResults = accountsSorted.map((account, index) => {
        return <AccountCard showDetailed={id => this.showDetailed(id)} key={index} {...account} />;
      });
    }
    return (
      <section>
        <h3>Accounts</h3>
        <SearchBar />
        <Filters />
        <AccountDetails />
        <ul>{accountResults}</ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.accounts.filter,
  accounts: state.accounts.accounts,
  searchTerm: state.accounts.searchTerm
});

export default requiresLogin()(connect(mapStateToProps)(AccountsPage));
