import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from '../require-login';
import { getAccounts } from '../../actions/accounts';

import SearchBar from './search-bar';

import Filters from './account-filters';
import AccountCard from './account-card';
import AccountDetails from './account-details';

import styles from '../styles/accountPage.module.css';

export class AccountsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
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
      accountResults = accountsSorted.map((account, index) => (
        <React.Fragment key={index}>
          <AccountCard {...account} />
          <hr className={styles.hr}/>
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
          {/* <div className={styles.details}> */}
            {selectedAccount ? <AccountDetails /> : ''}
          {/* </div> */}
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
