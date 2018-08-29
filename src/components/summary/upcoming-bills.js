import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
// import { Link, Redirect } from 'react-router-dom';

import styles from '../styles/summary.module.css';

export class UpcomingBills extends React.Component {
  render() {
    let accountResults;
    if (this.props.accounts) {
      accountResults = this.props.accounts.map((account, index) => (
        <React.Fragment>
          <AccountCard key={index} {...account} />
          <hr />
        </React.Fragment>
      ));
    }
    return (
      <div className={styles.upcomingBills}>
        <h3>Upcoming Bills</h3>
        <ul>{accountResults}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(UpcomingBills);
