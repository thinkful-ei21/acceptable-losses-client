import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';

import styles from '../styles/summary.module.css';
import moment from 'moment';

export class UpcomingBills extends React.Component {
  render() {
    let accountResults;

    if (this.props.accounts) {
      let accountsThirtyDays = this.props.accounts.filter(account => {
        if (account.nextDue) {
          return moment(account.nextDue.dueDate) < moment().add(1, 'month');
        } else {
          return '';
        }
      });
      let accountsSorted = accountsThirtyDays.sort((a, b) => {
        var dateA = new Date(a.nextDue.dueDate);
        var dateB = new Date(b.nextDue.dueDate);
        return dateA - dateB;
      });
      accountResults = accountsSorted.map((account, index) => (
        <React.Fragment key={index}>
          <AccountCard {...account} styles={styles} />
          <hr className={styles.hr} />
        </React.Fragment>
      ));
    }

    return (
      <div className={styles.upcomingBills}>
        <h3 className={styles.h3}>Upcoming Bills</h3>
        <ul>{accountResults}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(UpcomingBills);
