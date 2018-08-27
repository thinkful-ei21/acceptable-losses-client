import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import {payBill, getAccount} from '../actions/accounts'
import { Link } from 'react-router-dom';

class AccountCard extends React.Component {

render(){

  let finalAmount= Number(this.props.nextDue.amount).toFixed(2)
  return(
    <div className="account-box">
      <h4>{this.props.name}</h4>
      <p>Due: {moment(this.props.nextDue.dueDate).format('MMM Do, YYYY')} </p>
      <p>Amount: ${this.props.nextDue.amount ?  finalAmount : ' ---'} </p>
      <a target='_blank' href={this.props.url} className="button">Pay Here</a>
      <button onClick= {e=>this.props.dispatch(payBill(this.props.nextDue, this.props.id))}>Mark as Paid</button>
      <Link to="/accounts">
      <button className="" onClick= {e=>this.props.dispatch(getAccount(this.props.id))}>Account Details</button>
    </Link>
      <p>---------------------------------------------------------------------------</p>
    </div>
  ); 
  }
}

export default connect()(AccountCard);
