import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import {payBill} from '../actions/accounts'

class AccountCard extends React.Component {

render(){

  let finalAmount= Number(this.props.nextDue.amount).toFixed(2)
  let detailsButton;
  if (this.props.showDetailed){
    detailsButton= <button onClick= {e=>this.props.showDetailed(this.props.id)}>details</button>  
  }
  return(
    <div className="account-box">
      <h4>{this.props.name}</h4>
      <p>due date: {moment(this.props.nextDue.dueDate).format('MMM Do, YYYY')} </p>
      <p>amount due: ${this.props.nextDue.amount ?  finalAmount : ' ---'} </p>
      <button target="_blank" href={this.props.url}>Pay here!</button>
      <button onClick= {e=>this.props.dispatch(payBill(this.props.nextDue, this.props.id))}>mark as paid</button>
      {detailsButton}
      <p>---------------------------------------------------------------------------</p>
    </div>
  ); 
  }
}

export default connect()(AccountCard);
