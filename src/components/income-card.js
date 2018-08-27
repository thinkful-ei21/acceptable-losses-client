import React from 'react';
import { connect } from 'react-redux';
import { deleteIncome, showUpdateForm, getIncome } from '../actions/incomes';

class IncomeCard extends React.Component {
  render() {
    // console.log(this.props.income);
    // let income = this.props.income;

    return (
      <li key={this.props.key} className="income-box">
        <h4>{this.props.source}</h4>
        <p>Amount: ${Number(this.props.amount).toFixed(2)}</p>
        <button className="edit-button" onClick={() => this.toggleUpdate(this.props.id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => this.props.dispatch(deleteIncome(this.props.id))}>
          Delete
        </button>
      </li>
    );
  }
}

// const mapStateToProps = state => ({
//   income: state.incomes.income
// });

export default connect()(IncomeCard);
