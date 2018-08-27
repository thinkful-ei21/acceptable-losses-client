import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
// import { Link, Redirect } from 'react-router-dom';

export class UpcomingBills extends React.Component {
  render() {
    let accountResults;
    if (this.props.accounts) {
      accountResults = this.props.accounts.map((account, index) => (
        <li key={index}>
          <AccountCard {...account} />
        </li>
      ));
    }
    return (
      <div>
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
