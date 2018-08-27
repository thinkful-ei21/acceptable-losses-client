import React from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm, focus } from 'redux-form';
// import Input from './input';
// import { updateAccount, deleteAccount, toggleEdit } from '../actions/accounts';
// import moment from 'moment';
// import updateIncome from './update-income';
import { showUpdateForm } from '../actions/incomes';

export class IncomeView extends React.Component {
  render() {
    console.log('hello?');
    // let updateIncome,
    //   buttons,
    //   income = this.props.income,
    //   toggleForm = this.props.toggleForm,
    //   toggleUpdateForm = this.props.toggleUpdateForm;

    // if (income !== null && !toggleForm) {
    //   nextDueBill = (
    //     <h3>
    //       Income: {income.source} -- ${income.amount}
    //     </h3>
    //   );
    //   buttons = (
    //     <div>
    //       <button className="edit-button" onClick={() => this.props.dispatch(showUpdateForm())}>
    //         Edit
    //       </button>
    //       <button className="delete-button" onClick={() => this.props.dispatch(deleteIncome(income.id))}>
    //         Delete
    //       </button>
    //     </div>
    //   );
    // }
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
