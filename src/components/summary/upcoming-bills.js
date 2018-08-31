import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';

import styles from '../styles/summary.module.css';

export class UpcomingBills extends React.Component {
  render() {
    let accountResults;
    if (this.props.accounts) {
      accountResults = this.props.accounts.map((account, index) => (
        <React.Fragment key={index}>
          <AccountCard {...account} />
          <hr className={styles.hr}/>
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
