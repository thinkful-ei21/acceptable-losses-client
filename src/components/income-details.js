import React from 'react';
import { connect } from 'react-redux';

import UpdateIncome from './update-income';

export class IncomeView extends React.Component {
  render() {
    const { income, toggleUpdateForm } = this.props;
    let updateIncome;

    if (income !== null && toggleUpdateForm) {
      updateIncome = <UpdateIncome />;
    }

    return (
      <div>
        <h2>{income.source}</h2>
        {updateIncome}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toggleUpdateForm: state.incomes.toggleUpdateForm,
  income: state.incomes.income
});

export default connect(mapStateToProps)(IncomeView);
