import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';

export class SummaryExpenses extends React.Component {
  render() {
    let totalExpenses = 0;

    this.props.accounts.forEach(account => {
      const result = account.bills[account.bills.length - 1];
      if (account.frequency === '6 Months') {
        totalExpenses += result.amount / 6;
      } else if (account.frequency === 'Annual') {
        totalExpenses += result.amount / 12;
      } else if (result.amount !== null) {
        totalExpenses += result.amount;
      }
    });

    const expenseAccounts = this.props.accounts.map((account, index) => {
      const result = account.bills[account.bills.length - 1];
      const AccFreq = { 'One Time': 1, Monthly: 1, '6 Months': 6, Annual: 12 };
      return (
        <li key={index}>
          <p>
            {account.name}
            <span>{`${result.amount} / ${Math.round(
              (result.amount / AccFreq[account.frequency] / totalExpenses) *
                10000
            ) / 100}%`}</span>
          </p>
        </li>
      );
    });

    return (
      <section className="summary-expenses">
        <p>
          Expenses: <span>{totalExpenses}</span>
        </p>
        <ul>{expenseAccounts}</ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(SummaryExpenses);
