import React from 'react';
import { connect } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';
import PieChartExpenses from './summary-expenses-pie-chart';
import BarGraphExpenses from './summary-expenses-bar-graph';


export class SummaryExpenses extends React.Component {
  render() {
    let totalExpenses = 0;
    const barGraphData = [],
          pieGraphData = [];

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
      // const percent = ((result.amount / AccFreq[account.frequency] / totalExpenses) * 100).toFixed(2);
      result.amount = Number((result.amount / AccFreq[account.frequency]).toFixed(2));

      //////// For Bar Graph /////////
      const label = '$' + `${result.amount}`;
      barGraphData.push({
        account: account.name,
        Bill: result.amount
      })
      ////////////////////////////////

      //////// For Pie Chart ///////////
      pieGraphData.push({
        id: account.name,
        label: account.name,
        value: result.amount,
      })
      /////////////////////////////////

      return (
        <li key={index}>
          <p>
            {account.name} <span>{label}</span>
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


    console.log(pieGraphData);
    return (
      <section className="summary-expenses">
        <p>_______________________________________</p>
        <p>PIE CHART GOES HERE</p>
        <PieChartExpenses
          graphData={pieGraphData}
        />


        <p>_______________________________________</p>

        <p>
          Total Expenses: <span>${totalExpenses}</span>
        </p>
        {(barGraphData.length !== 0 && totalExpenses > 0) ?
          <BarGraphExpenses
            graphData={barGraphData}
            max={totalExpenses}
          /> :
          ''
        }


        {/* <ul>{expenseAccounts}</ul> */}
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
