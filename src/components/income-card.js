import React from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { getIncome } from '../actions/incomes';
import { Link } from 'react-router-dom';

class IncomeCard extends React.Component {
  render() {
    let incomeAmount = Number(this.props.amount).toFixed(2);
    let detailsButton;
    if (this.props.showDetailed) {
      detailsButton = <button onClick={e => this.props.showDetailed(this.props.id)}>Details</button>;
    } else {
      detailsButton = (
        <Link to="/incomes">
          <button className="" onClick={e => this.props.dispatch(getIncome(this.props.id))}>
            Income Details
          </button>
        </Link>
      );
    }

    return (
      <div className="income-box">
        <h4>{this.props.source}</h4>
        {/* <p>due date: {moment(this.props.source).format('MMM Do, YYYY')} </p> */}
        <p>amount: ${this.props.amount ? incomeAmount : ' ---'} </p>
        {/* <button target="_blank" href={this.props.url}>
          Pay here!
        </button> */}
        {/* <button onClick={e => this.props.dispatch(payBill(this.props.nextDue, this.props.id))}>mark as paid</button> */}
        {detailsButton}
        <p>---------------------------------------------------------------------------</p>
      </div>
    );
  }
}

export default connect()(IncomeCard);
