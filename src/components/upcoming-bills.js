import React from 'react';
import { connect } from 'react-redux';
import AccountCard from './account-card';
// import { Link, Redirect } from 'react-router-dom';

export class UpcomingBills extends React.Component {
  
  render() {
    let accountResults;
    if (this.props.accounts){
        accountResults= this.props.accounts.map(account=>
            <AccountCard key={account.id}{...account}/>)
    };
    return (
        <div>
            <h3>Upcoming</h3>
            {accountResults}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(UpcomingBills);
