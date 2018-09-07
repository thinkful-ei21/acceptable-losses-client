import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from '../require-login';
import { getAccounts, resetToggles, toggleFilter } from '../../actions/accounts';
import moment from 'moment';

import SearchBar from './search-bar';

import Filters from './account-filters';
import AccountCard from './account-card';
import AccountDetails from './account-details';

import styles from '../styles/accountPage.module.css';

export class AccountsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
    this.props.dispatch(resetToggles());
    this.props.dispatch(toggleFilter('abc'));
  }
  filterAccounts(accounts, filter) {
    let filterResults;
    if (filter === 'abc') {
      filterResults = accounts.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    }
    if (filter === 'pastDue') {
      filterResults = accounts.filter(account => {
        if (account.nextDue) {
          //compare moment dates to include m,d,y
          return moment(account.nextDue.dueDate).format('MM-DD-YYYY') < moment().format('MM-DD-YYYY');
        } else {
          return '';
        }
      });
    } else {
      filterResults = accounts.sort((a, b) => {
        if (a.nextDue && b.nextDue) {
          var dateA = new Date(a.nextDue.dueDate);
          var dateB = new Date(b.nextDue.dueDate);
          if (filter === 'newest') {
            return dateA - dateB;
          }
          if (filter === 'oldest') {
            return dateB - dateA;
          } else {
            return '';
          }
        } else {
          return '';
        }
      });
    }
    return filterResults;
  }
  render() {
    const { searchTerm, filter, selectedAccount } = this.props;
    let accounts = this.props.accounts.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.bills.find(item => item.dueDate.includes(searchTerm)) ||
        item.bills.find(item => item.frequency === searchTerm) ||
        item.bills.find(item => item.amount === searchTerm)
    );

    let accountResults, accountsSorted;
    if (accounts) {
      accountsSorted = this.filterAccounts(accounts, filter);
      accountResults = accountsSorted.map((account, index) => (
        <React.Fragment key={index}>
          <AccountCard {...account} styles={styles} />
          <hr className={styles.hr} />
        </React.Fragment>
      ));
    }
    return (
      <section className={styles.wholePage}>
        <h2 className={styles.h2}>Bills</h2>
        <section className={styles.searchBillFilters}>
          <Filters />
          <SearchBar />
        </section>

        <section className={styles.allContent}>
          <div className={styles.bills}>
            <ul className={styles.billsList}>
              {accountResults}
            </ul>
          </div>
          {selectedAccount ? <AccountDetails /> : ''}
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.accounts.filter,
  accounts: state.accounts.accounts,
  searchTerm: state.accounts.searchTerm,
  selectedAccount: state.accounts.account
});

export default requiresLogin()(connect(mapStateToProps)(AccountsPage));
