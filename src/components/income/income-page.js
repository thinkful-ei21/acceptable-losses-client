import React from 'react';
import { connect } from 'react-redux';

import { getIncomes, getIncome, showUpdateForm } from '../../actions/incomes';

import IncomeCard from './income-card';
import IncomeView from './income-details';
import requiresLogin from '../require-login';

export class Incomes extends React.Component {
  componentDidMount() {
    this.props.dispatch(getIncomes());
  }

  toggleUpdate(id) {
    return this.props.dispatch(getIncome(id)).then(() => this.props.dispatch(showUpdateForm()));
  }

  render() {
    let incomeResults;
    let incomesSorted;
    if (this.props.incomes) {
      incomesSorted = this.props.incomes.sort(function(a, b) {
        if (a.source.toLowerCase() < b.source.toLowerCase()) return -1;
        if (a.source.toLowerCase() > b.source.toLowerCase()) return 1;
        return 0;
      });
      incomeResults = incomesSorted.map((income, index) => {
        return <IncomeCard toggle={this.toggleUpdate} key={index} {...income} />;
      });
    }

    return (
      <div className="incomes">
        <h3>Incomes</h3>
        <IncomeView />
        <p>---------------------------------------------------------------------------</p>
        <ul>{incomeResults}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  incomes: state.incomes.incomes
});

export default requiresLogin()(connect(mapStateToProps)(Incomes));
