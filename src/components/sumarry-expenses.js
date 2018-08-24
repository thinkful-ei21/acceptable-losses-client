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
} from '../actions/incomes';

import IncomeForm from './income-form';
import UpdateIncomeForm from './update-income';
import PieChartExpenses from './summary-expenses-pie-chart';
import BarGraphExpenses from './summary-expenses-bar-graph';



export class SummaryExpenses extends React.Component {
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
    this.props.dispatch(showUpdateForm());
    this.props.dispatch(getIncome(id));
  }

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

    totalExpenses = Number(totalExpenses).toFixed(2);

    let totalIncome = 0;
    this.props.incomes.forEach(income => {
      totalIncome += Number(income.amount);
    });
    totalIncome = Number(totalIncome).toFixed(2);

    const expenseAccounts = this.props.accounts.map((account, index) => {
      const result = account.bills[account.bills.length - 1];
      const AccFreq = { 'One Time': 1, Monthly: 1, '6 Months': 6, Annual: 12 };
      // const percent = Number((result.amount / AccFreq[account.frequency] / totalExpenses) * 100).toFixed(2);
      result.amount = Number((result.amount / AccFreq[account.frequency]).toFixed(2));

      return (
        <li key={index}>
          <p>
            {account.name} <span>{label}</span>
          </p>
        </li>
      );
    });

    const incomes = this.props.incomes.map((income, index) => {
      income.amount = Number(income.amount).toFixed(2);
      const id = income.id;
      // let updateItem = {
      //   id,
      //   source: income.source,
      //   amount: income.amount
      // };

      return (
        <li key={index}>
          <p>
            {income.source}
            <span>
              ${income.amount}
              /Mo
            </span>
          </p>
          <button onClick={() => this.deleteIncome(id)}>Del</button>
          <button onClick={() => this.toggleUpdate(id)}>Update</button>
        </li>
      );
    });
    let incomeDisplay, addIncome;
    if (!this.props.toggleForm && !this.props.toggleUpdateForm) {
      incomeDisplay = incomes;
      addIncome = <button onClick={() => this.showForm()}>Add Income</button>;
    }
    if (!this.props.toggleForm && this.props.toggleUpdateForm) {
      incomeDisplay = incomes;
      addIncome = (
        <React.Fragment>
          <h3>Update Income Source</h3>
          <UpdateIncomeForm updateItem={this.props.income} />
          {/* button FOR TOMOROW*/}
        </React.Fragment>
      );
    }
    if (this.props.toggleForm && !this.props.toggleUpdateForm) {
      addIncome = (
        <React.Fragment>
          <h3>Enter Income Source</h3>
          <IncomeForm />
          {/* button FOR TOMOROW*/}
        </React.Fragment>
      );
    }


    console.log(pieGraphData);
    return (
      <section className="summary-expenses">
        <PieChartExpenses
          graphData={pieGraphData}
        />

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
        <p>
          Incomes: <span>${totalIncome}</span>
        </p>
        {addIncome}
        <ul>{incomeDisplay}</ul>
      </section>
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

export default connect(mapStateToProps)(SummaryExpenses);
