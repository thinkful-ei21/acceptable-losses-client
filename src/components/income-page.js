import React from 'react';
import { connect } from 'react-redux';
import IncomeCard from './income-card';
import IncomeView from './account-details';
import requiresLogin from './require-login';
// import SearchBar from './search-bar';
import { getIncome, getIncomes } from '../actions/incomes';
// import Filters from './account-filters';

export class Incomes extends React.Component {
  componentDidMount() {
    this.props.dispatch(getIncomes());
  }

  showDetailed(id) {
    this.props.dispatch(getIncome(id));
  }

  render() {
    // let incomes = this.props.incomes.filter(
    //   item =>
    //     item.name.toLowerCase().includes(this.props.searchTerm) ||
    //     item.url.toLowerCase().includes(this.props.searchTerm) ||
    //     item.bills.find(item => item.dueDate.includes(this.props.searchTerm)) ||
    //     item.bills.find(item => item.frequency === this.props.searchTerm) ||
    //     item.bills.find(item => item.amount === this.props.searchTerm)
    // );

    let incomeResults;
    let incomesSorted;
    if (this.props.incomes) {
      incomesSorted = this.props.incomes.sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      incomeResults = incomesSorted.map(income => {
        return <IncomeCard showDetailed={id => this.showDetailed(id)} key={income.id} {...income} />;
      });
    }

    return (
      <div className="incomes">
        <h3>Incomes</h3>
        {/* <SearchBar /> */}
        {/* <Filters /> */}
        <IncomeView />
        <p>---------------------------------------------------------------------------</p>
        {incomeResults}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  incomes: state.incomes.incomes
});

export default requiresLogin()(connect(mapStateToProps)(Incomes));
