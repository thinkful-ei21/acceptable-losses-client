import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
// import { Link, Redirect } from 'react-router-dom';

import styles from '../styles/summary.module.css';

export class UpcomingBills extends React.Component {
  render() {
    let accountResults;
    if (this.props.accounts) {
      accountResults = this.props.accounts.map((account, index) => <AccountCard key={index} {...account} />);
    }
    return (
      <div className={styles.upcomingBills}>
        <h3>Upcoming</h3>
        <ul>{accountResults}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(UpcomingBills);
