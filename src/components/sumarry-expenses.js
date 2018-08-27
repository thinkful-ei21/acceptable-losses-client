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
    return this.props.dispatch(getIncome(id))
    .then(()=>this.props.dispatch(showUpdateForm()))
    
  }

  cancelAdd() {
    this.props.dispatch(hideIncomeForm());
  }
  cancelUpdate() {
    this.props.dispatch(hideUpdateForm());
  }

  render() {
    let totalExpenses = 0;
    const expensesBarGraphData = [],
      incomeBarGraphData = [],
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

    this.props.accounts.forEach(account => {
      const result = account.bills[account.bills.length - 1];
      const AccFreq = { 'One Time': 1, Monthly: 1, '6 Months': 6, Annual: 12 };
      // const percent = Number((result.amount / AccFreq[account.frequency] / totalExpenses) * 100).toFixed(2);
      result.amount = Number((result.amount / AccFreq[account.frequency]).toFixed(2));

      //////// For Bar Graph /////////
      expensesBarGraphData.push({
        account: account.name,
        Bill: result.amount
      });
      //////// For Pie Chart ///////////
      pieGraphData.push({
        id: account.name,
        label: account.name,
        value: result.amount
      });
      //
      // return (
      //   <li key={index}>
      //     <p>
      //       {account.name} <span>{`$${result.amount}`}</span>
      //     </p>
      //   </li>
      // );
    });

    // const incomes = this.props.incomes.map((income, index) => {
    //   income.amount = Number(income.amount).toFixed(2);
    //   const id = income.id;
    //   // let updateItem = {
    //   //   id,
    //   //   source: income.source,
    //   //   amount: income.amount
    //   // };
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
    let incomeDisplay, addIncome;
    if (!this.props.toggleForm && !this.props.toggleUpdateForm) {
      // incomeDisplay = incomes;
      addIncome = <button onClick={() => this.showForm()}>Add Income</button>;
    }
    if (!this.props.toggleForm && this.props.toggleUpdateForm) {
      // incomeDisplay = incomes;
      addIncome = (
        <React.Fragment>
          <h3>Update Income Source</h3>
          <UpdateIncomeForm updateItem={this.props.income} />
          <button onClick={() => this.cancelUpdate()}>X</button>
        </React.Fragment>
      );
    }
    if (this.props.toggleForm && !this.props.toggleUpdateForm) {
      addIncome = (
        <React.Fragment>
          <h3>Enter Income Source</h3>
          <IncomeForm />
          <button onClick={() => this.cancelAdd()}>X</button>
        </React.Fragment>
      );
    }
    console.log(this.props.incomes);

    this.props.incomes.map(income => {
      incomeBarGraphData.push({
        income: income.source,
        Amount: income.amount
      })
    })

    return (
      <section className="summary-expenses">
        <PieChartExpenses graphData={pieGraphData} />

        <p>
          Total Expenses: <span>${totalExpenses}</span>
        </p>
        {expensesBarGraphData.length !== 0 && totalExpenses > 0 ? (
          <BarGraphExpenses
            graphData={expensesBarGraphData}
            max={Number(totalExpenses)}
            keys={["Bill"]}
            indexBy="account"
          />
        ) : ''
        }

        {/* <ul>{expenseAccounts}</ul> */}
        <p>_______________________________________</p>
        <p>
          Incomes: <span>${totalIncome}</span>
        </p>
        {addIncome}
        {/* <ul>{incomeDisplay}</ul> */}
        <BarGraphExpenses
          graphData={incomeBarGraphData}
          max={Number(totalIncome)}
          keys={["Amount"]}
          indexBy="income"
        />
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
