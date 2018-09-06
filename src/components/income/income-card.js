import React from 'react';
import { connect } from 'react-redux';

import { deleteIncome, getIncome, showUpdateForm, hideIncomeForm } from '../../actions/incomes';

export class IncomeCard extends React.Component {
  toggleUpdate(id) {
    const { dispatch } = this.props;
    return dispatch(getIncome(id))
      .then(() => dispatch(hideIncomeForm()))
      .then(() => dispatch(showUpdateForm()));
  }

  render() {
    const { key, source, amount, id, dispatch } = this.props;
    return (
      <li key={key} className="income-box">
        <h4>{source}</h4>
        <p>Amount: ${Number(amount).toFixed(2)}</p>
        <button onClick={() => this.toggleUpdate(id)}>Edit</button>
        <button onClick={() => dispatch(deleteIncome(id))}>Delete</button>
      </li>
    );
  }
}

export default connect()(IncomeCard);
