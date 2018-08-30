import React from 'react';
import { connect } from 'react-redux';

import {
  getIncomes,
  getIncome,
  deleteIncome,
  showIncomeForm,
  hideIncomeForm,
  showUpdateForm,
  hideUpdateForm
} from '../../actions/incomes';

// import IncomeForm from '../income/income-form';
// import UpdateIncomeForm from '../income/update-income';
import PieChartExpenses from './summary-expenses-pie-chart';
import BarGraphExpenses from './summary-expenses-bar-graph';

import styles from '../styles/summary.module.css';

export class SummaryDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(getIncomes());
  }

  showForm() {
    this.props.dispatch(showIncomeForm());
  }

  deleteIncome(id) {
    this.props.dispatch(deleteIncome(id));
  }

  toggleUpdate(id) {
    return this.props.dispatch(getIncome(id)).then(() => this.props.dispatch(showUpdateForm()));
  }

  cancelAdd() {
    this.props.dispatch(hideIncomeForm());
  }

  cancelUpdate() {
    this.props.dispatch(hideUpdateForm());
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
    if (account.frequency === 'quarterly') {
      totalExpenses += bill.amount / 3;
    } else if (account.frequency === 'semi-annual') {
      totalExpenses += bill.amount / 6;
    } else if (account.frequency === 'annual') {
      totalExpenses += bill.amount / 12;
    } else if (bill.amount !== null) {
      totalExpenses += bill.amount;
    }
    return totalExpenses;
  }

  render() {
    let totalExpenses = 0,
      totalIncome = 0,
      addIncome,
      incomeBarGraphData = [],
      expensesBarGraphData = [],
      pieGraphData = [];

    this.props.accounts.forEach(account => {
      const bill = this.findNextDueBill(account);
      const AccFreq = { 'One Time': 1, Monthly: 1, Quarterly: 3, 'Semi-Annually': 6, Annually: 12 };
      const amount = Number((bill.amount / AccFreq[account.frequency]).toFixed(2));
      expensesBarGraphData = [...expensesBarGraphData, ...this.creatBarGraphData(account, amount)];
      pieGraphData = [...pieGraphData, ...this.creatPieChartData(account, amount)];
      totalExpenses += this.calcTotalExpences(account);
    });

    totalExpenses = Number(totalExpenses).toFixed(2);

    this.props.incomes.forEach(income => {
      totalIncome += Number(income.amount);
    });

    totalIncome = Number(totalIncome).toFixed(2);

    // const incomes = this.props.incomes.map((income, index) => {
    //   income.amount = Number(income.amount).toFixed(2);
    //   const id = income.id;
    //
    //   return (
    //     <li key={index}>
    //       <p>
    //         {income.source}
    //         <span>
    //           ${income.amount}
    //           /Mo
    //         </span>
    //       </p>
    //       <button onClick={() => this.deleteIncome(id)}>Del</button>
    //       <button onClick={() => this.toggleUpdate(id)}>Update</button>
    //     </li>
    //   );
    // });

    // if (!this.props.toggleForm && !this.props.toggleUpdateForm) {
    //   addIncome = <button onClick={() => this.showForm()}>Add Income</button>;
    // }
    // if (!this.props.toggleForm && this.props.toggleUpdateForm) {
    //   addIncome = (
    //     <React.Fragment>
    //       <h3>Update Income Source</h3>
    //       <UpdateIncomeForm updateItem={this.props.income} />
    //       <button onClick={() => this.cancelUpdate()}>X</button>
    //     </React.Fragment>
    //   );
    // }
    // if (this.props.toggleForm && !this.props.toggleUpdateForm) {
    //   addIncome = (
    //     <React.Fragment>
    //       <h3>Enter Income Source</h3>
    //       <IncomeForm />
    //       <button onClick={() => this.cancelAdd()}>X</button>
    //     </React.Fragment>
    //   );
    // }

    this.props.incomes.map(income => {
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
              <BarGraphExpenses
                graphData={expensesBarGraphData}
                // max={Number(totalExpenses)}
                keys={['Bill']}
                indexBy="account"
              />
            ) : (
              ''
            )}
          </section>
          <section>
            {/* <ul>{expenseAccounts}</ul> */}
            {/* <p>_______________________________________</p> */}
            <p className={styles.header}>
              Incomes: <span>${totalIncome}</span>
            </p>
            {addIncome}
            {/* <ul>{incomeDisplay}</ul> */}
            <BarGraphExpenses
              graphData={incomeBarGraphData}
              // max={Number(totalIncome)} 
              keys={['Amount']}
              indexBy="income"
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  incomes: state.incomes.incomes,
  income: state.incomes.income,
  toggleForm: state.incomes.toggleForm,
  toggleUpdateForm: state.incomes.toggleUpdateForm,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(SummaryDisplay);
