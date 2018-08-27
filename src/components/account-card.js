import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import {payBill, getAccount} from '../actions/accounts'
import { Link } from 'react-router-dom';

class AccountCard extends React.Component {

render(){

  let finalAmount= Number(this.props.nextDue.amount).toFixed(2)
  let detailsButton;
  if (this.props.showDetailed){
    detailsButton= <button onClick= {e=>this.props.showDetailed(this.props.id)}>details</button>  
  }  else{
    detailsButton=
    <Link to="/accounts">
      <button className="" onClick= {e=>this.props.dispatch(getAccount(this.props.id))}>Account Details</button>
    </Link>
  }
  
  return(
    <div className="account-box">
      <h4>{this.props.name}</h4>
      <p>due date: {moment(this.props.nextDue.dueDate).format('MMM Do, YYYY')} </p>
      <p>amount due: ${this.props.nextDue.amount ?  finalAmount : ' ---'} </p>
      <button target="_blank" href={this.props.url}>Pay here!</button>
      <button onClick= {e=>this.props.dispatch(payBill(this.props.nextDue, this.props.id))}>Mark as Paid</button>
      {detailsButton}
      <p>---------------------------------------------------------------------------</p>
    </div>
  ); 
  }
}

export default connect()(AccountCard);
