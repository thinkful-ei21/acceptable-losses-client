import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

/* 
pull the value of each amount due within the given month

*/

export class SummaryExpenses extends React.Component {
  earliest(array) {
    if (array.length > 1) {
      array.reduce(function(pre, cur) {
        return Date.parse(pre) > Date.parse(cur) ? cur : pre;
      });
    } else return array[0];
  }

  render() {
    let mostRecent,
      unpaidBills,
      dueDates,
      earliestDate,
      totalExpenses = 0;
    if (this.props.accounts) {
      this.props.accounts.forEach(account => {
        unpaidBills = account.bills.filter(item => item.isPaid === false);
        dueDates = unpaidBills.map(item => (item = item.dueDate));
        earliestDate = this.earliest(dueDates);
        mostRecent = unpaidBills.find(item => item.dueDate === earliestDate);
        // if (account.frequency === 'monthly') {
        //   totalExpenses += mostRecent;
        // }
        if (account.frequency === '6 Months') {
          totalExpenses += mostRecent.amount / 6;
        } else if (account.frequency === 'Annual') {
          totalExpenses += mostRecent.amount / 12;
        } else if (mostRecent.amount !== null) {
          totalExpenses += mostRecent.amount;
        }
      });
    }

    // console.log(oneAccount);
    console.log(this.props.accounts);
    console.log(totalExpenses);
    // console.log(totalExpenses);

    return (
      <section className="summary-expenses">
        <p>Expenses</p>
        {/* {totalExpenses} */}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(SummaryExpenses);
