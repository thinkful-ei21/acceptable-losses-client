import React from 'react';
import {connect} from 'react-redux';


class AccountCard extends React.Component {

render(){

  let finalAmount= Number(this.props.nextDue.amount).toFixed(2)

  return(
    <div className="account-box">
      <h4>{this.props.name}</h4>
      <p>due date: {this.props.nextDue.dueDate} </p>
      <p>amount due: ${this.props.nextDue.amount ?  finalAmount : ' ---'} </p>
      <button target="_blank" href={this.props.url}>pay now</button>
      <button onClick= {e=>this.props.showDetailed(this.props.id)}>v</button>
      <p>---------------------------------------------------------------------------</p>
    </div>
  ); 
  }
}

export default connect()(AccountCard);
