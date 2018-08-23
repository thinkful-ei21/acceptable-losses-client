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

    totalExpenses = Number(totalExpenses.toFixed(2));

    const expenseAccounts = this.props.accounts.map((account, index) => {
      const result = account.bills[account.bills.length - 1];
      const AccFreq = { 'One Time': 1, Monthly: 1, '6 Months': 6, Annual: 12 };
      const percent = ((result.amount / AccFreq[account.frequency] / totalExpenses) * 100).toFixed(2);
      result.amount = Number(result.amount.toFixed(2));

      return (
        <li key={index}>
          <p>
            {account.name} <span>${`${result.amount} / ${percent}%`}</span>
          </p>
        </li>
      );
    });

    let income;
    if (this.props.income) {
      income = (
        <section>
          <p>
            Income: <span>{this.props.income}</span>
          </p>
          {/* <ul>{incomeTypes}</ul> */}
        </section>
      );
    } else {
      income = <p>This is a post MVP... needs to update the user schema to contain income</p>;
    }

    return (
      <section className="summary-expenses">
        <p>_______________________________________</p>
        <p>PIE CHART GOES HERE</p>
        <p>_______________________________________</p>

        <p>
          Total Expenses: <span>${totalExpenses}</span>
        </p>

        <ul>{expenseAccounts}</ul>
        <p>_______________________________________</p>

        {income}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

export default connect(mapStateToProps)(SummaryExpenses);
