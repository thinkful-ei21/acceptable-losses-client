import React from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm, focus } from 'redux-form';
// import Input from './input';
// import { updateAccount, deleteAccount, toggleEdit } from '../actions/accounts';
// import moment from 'moment';
// import updateIncome from './update-income';
import { showUpdateForm } from '../actions/incomes';

export class IncomeView extends React.Component {
  // onSubmit(value) {
  //   let income = this.props.income,
  //     newIncome = {
  //       source: income.name,
  //       amount: income.amount
  //     };
  //   return this.props.dispatch(updateIncome(newIncome, income.id));
  // }

  render() {
    let updateIncome,
      buttons,
      income = this.props.income,
      toggleForm = this.props.toggleForm,
      toggleUpdateForm = this.props.toggleUpdateForm;

    if (income !== null && !toggleForm) {
      nextDueBill = (
        <h3>
          Income: {income.source} -- ${income.amount}
        </h3>
      );
      buttons = (
        <div>
          <button className="edit-button" onClick={e => this.props.dispatch(showUpdateForm())}>
            Edit
          </button>
          <button className="delete-button" onClick={e => this.props.dispatch(deleteIncome(income.id))}>
            Delete
          </button>
        </div>
      );
    }
    if (income !== null && toggleUpdateForm) {
      updateIncome = <UpdateIncome />;
    }

    return (
      <div className="income-view">
        <h2>{income.source}</h2>
        {updateIncome}
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    toggleForm: state.incomes.toggleForm,
    toggleUpdateForm: state.incomes.toggleUpdateForm,
    income: state.incomes.income
  };
};

export default connect(mapStateToProps)(IncomeView);
