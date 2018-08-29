import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getAccount } from '../../actions/accounts';


class AccountCardPaid extends React.Component {
  render() {
    const { bills, id, dispatch, name, key } = this.props;
    let paidBill = bills.find((bill)=>moment(bill.dueDate).format('YYYY-MM-DD')===moment(this.props.selectedDay).format('YYYY-MM-DD')&& bill.datePaid !==null)

    if(paidBill){return (
      <li key={key}>
        <h4>{name}</h4>
        <p>Due: {moment(paidBill.dueDate).format('MMM Do, YYYY')} </p>
        <p>Paid: {moment(paidBill.datePaid).format('MMM Do, YYYY')} </p>
        <p>Amount: ${Number(paidBill.amount).toFixed(2)} </p>
        <Link to="/accounts">
          <button onClick={() => dispatch(getAccount(id))}>Account Details</button>
        </Link>
        <p>_____________________________________________________________</p>
      </li>
    );}
    return('')
  }
}

const mapStateToProps = state => ({
  selectedDay: state.accounts.selectedDay
});

export default connect(mapStateToProps)(AccountCardPaid);