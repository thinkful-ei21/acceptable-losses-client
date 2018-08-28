import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { payBill, getAccount } from '../../actions/accounts';

class AccountCard extends React.Component {
  render() {
    const { nextDue, id, url, dispatch, name, key } = this.props;
    let finalAmount = Number(nextDue.amount).toFixed(2);

    return (
      <li key={key}>
        <h4>{name}</h4>
        <p>Due: {moment(nextDue.dueDate).format('MMM Do, YYYY')} </p>
        <p>Amount: ${nextDue.amount ? finalAmount : ' ---'} </p>
        <a target="_blank" href={url}>
          Pay Here
        </a>
        <button onClick={e => dispatch(payBill(nextDue, id))}>Mark as Paid</button>
        <Link to="/app/accounts">
          <button onClick={() => dispatch(getAccount(id))}>Account Details</button>
        </Link>
        <p>_____________________________________________________________</p>
      </li>
    );
  }
}

export default connect()(AccountCard);
