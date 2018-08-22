import React from 'react';
import {connect} from 'react-redux';


class AccountCard extends React.Component {
  earliest(array){
    if(array.length>1){ 
    array.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    })}
    else return array[0];
  };

render(){
  let mostRecent, unpaidBills, dueDates, earliestDate;

  if(this.props.bills){
    unpaidBills = this.props.bills.filter(item=> item.isPaid === false);
    dueDates= unpaidBills.map(item => item =item.dueDate);
    earliestDate= this.earliest(dueDates);
    mostRecent = unpaidBills.find(item => item.dueDate === earliestDate);   
  };  

  return(
    <div className="account-box">
      <a target="_blank" href={this.props.url}>pay now</a>
      <h3>{this.props.name}</h3>  
      <p>due date: {mostRecent.dueDate} </p>
      <p>amount due: {mostRecent.amount} </p>
    </div>
  ) 
  }
}

export default (connect()(AccountCard));