import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { togglePay, getAccount } from '../../actions/accounts';
import AccountPay from './account-pay-form';


class AccountCard extends React.Component {
  render() {
    const { nextDue, id, url, dispatch, name, key, payButtonToggle } = this.props;
    let finalAmount = Number(nextDue.amount).toFixed(2);

    return (
      <li key={key}>
        <h4>{name}</h4>
        <p>Due: {moment(nextDue.dueDate).format('MMM Do, YYYY')} </p>
        <p>Amount: ${nextDue.amount ? finalAmount : ' ---'} </p>
        <a target="_blank" href={url}>
          Pay Here
        </a>
        {payButtonToggle=== id ? <AccountPay/>:<button onClick={() => {return dispatch(getAccount(id)).then(()=>dispatch(togglePay(id)))}}>Mark as Paid</button>}
        <Link to="/accounts">
          <button onClick={() => dispatch(getAccount(id))}>Account Details</button>
        </Link>
        <p>_____________________________________________________________</p>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  payButtonToggle: state.accounts.payButtonToggle
});
export default connect(mapStateToProps)(AccountCard);

