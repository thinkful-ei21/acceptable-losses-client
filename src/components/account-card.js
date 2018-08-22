import React from 'react';
import {connect} from 'react-redux';


class AccountCard extends React.Component {
  earliest(array){ 
    array.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    })
  };

render(){
  let dueBill;
  let unpaidBills;
  let dueDates;
  if(this.props.bills){
    unpaidBills = this.props.bills.filter(item=> item.paid === false);
    dueDates= unpaidBills.map(item => item =item.dueDate);
    dueBill = unpaidBills.filter(item => item.dueDate=== this.earliest(dueDates));
  };  

  return(
    <div className="account-box">
      <a target="_blank" href={this.props.url}>pay now</a>
      <h3>{this.props.name}</h3>  
      <p>{dueBill.amount}</p>
      <p>{dueBill.dueDate}</p>
    </div>
  ) 
  }
}

export default (connect()(AccountCard));