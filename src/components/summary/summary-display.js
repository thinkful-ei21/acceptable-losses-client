import React from 'react';
import { connect } from 'react-redux';

import { getIncomes } from '../../actions/incomes';
import PieChartExpenses from './summary-expenses-pie-chart';
import BarGraphExpenses from './summary-expenses-bar-graph';

import styles from '../styles/summary.module.css';

export class SummaryDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(getIncomes());
  }

  creatPieChartData(account, amount) {
    let pieGraphData = [];
    pieGraphData.push({
      id: account.name,
      label: account.name,
      value: amount
    });
    return pieGraphData;
  }

  creatBarGraphData(account, amount) {
    let barGraphData = [];
    barGraphData.push({
      account: account.name,
      Bill: amount
    });
    return barGraphData;
  }

  findNextDueBill(account) {
    return account.bills[account.bills.length - 1];
  }

  calcTotalExpences(account) {
    let totalExpenses = 0;
    const bill = this.findNextDueBill(account);
    if (account.frequency === 'Quarterly') {
      totalExpenses += bill.amount / 3;
    } else if (account.frequency === 'Semi-Annually') {
      totalExpenses += bill.amount / 6;
    } else if (account.frequency === 'Annually') {
      totalExpenses += bill.amount / 12;
    } else if (bill.amount !== null) {
      totalExpenses += bill.amount;
    }
    return totalExpenses;
  }

  render() {
    const { accounts, incomes } = this.props;
    let totalExpenses = 0,
      totalIncome = 0,
      addIncome,
      incomeBarGraphData = [],
      expensesBarGraphData = [],
      pieGraphData = [];

    accounts.forEach(account => {
      const bill = this.findNextDueBill(account);
      const AccFreq = { 'One Time': 1, Monthly: 1, Quarterly: 3, 'Semi-Annually': 6, Annually: 12 };
      const amount = Number((bill.amount / AccFreq[account.frequency]).toFixed(2));
      expensesBarGraphData = [...expensesBarGraphData, ...this.creatBarGraphData(account, amount)];
      pieGraphData = [...pieGraphData, ...this.creatPieChartData(account, amount)];
      totalExpenses += this.calcTotalExpences(account);
    });

    totalExpenses = Number(totalExpenses).toFixed(2);

    incomes.forEach(income => {
      totalIncome += Number(income.amount);
    });

    totalIncome = Number(totalIncome).toFixed(2);

    incomes.map(income => {
      return incomeBarGraphData.push({
        income: income.source,
        Amount: Number(income.amount)
      });
    });

    return (
      <div className={styles.expenses}>
        <section className={styles.pieChart}>
          <PieChartExpenses graphData={pieGraphData} />
        </section>
        <div className={styles.barGraphs}>
          <section>
            <p className={styles.header}>
              Total Expenses: <span>${totalExpenses}</span>
            </p>
            {expensesBarGraphData.length !== 0 && totalExpenses > 0 ? (
              <BarGraphExpenses graphData={expensesBarGraphData} keys={['Bill']} indexBy="account" />
            ) : (
              ''
            )}
          </section>
          <section>
            <p className={styles.header}>
              Incomes: <span>${totalIncome}</span>
            </p>
            {addIncome}
            <BarGraphExpenses graphData={incomeBarGraphData} keys={['Amount']} indexBy="income" />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  incomes: state.incomes.incomes
});

export default connect(mapStateToProps)(SummaryDisplay);
