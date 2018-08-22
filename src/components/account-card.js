import React from 'react';
<<<<<<< HEAD
import {connect} from 'react-redux';
import { link } from 'fs';


class AccountCard extends React.Component {
  // earliest(array){
  //   if(array.length>1){ 
  //   array.reduce(function (pre, cur) {
  //     return Date.parse(pre) > Date.parse(cur) ? cur : pre;
  //   })}
  //   else return array[0];
  // };

  oldest(bills){
    let result=bills[0];
    for(let i=bills.length-1; i>=0; i--){
       if (bills[i].paid === true){
         result= bills[i+1]
       }
    }
    return result;
  }

render(){
let billsList= this.props.bills;
let result= this.oldest(billsList)
  // let mostRecent, unpaidBills, dueDates, earliestDate;

  // if(this.props.bills){
  //   unpaidBills = this.props.bills.filter(item=> item.isPaid === false);
  //   dueDates= unpaidBills.map(item => item =item.dueDate);
  //   earliestDate= this.earliest(dueDates);
  //   mostRecent = unpaidBills.find(item => item.dueDate === earliestDate);   
  // };  
  return(
    <div className="account-box">
      <h4>{this.props.name}</h4>
      <p>due date: {result.dueDate} </p>
      <p>amount due: {result.amount ? result.amount : 'TBD'} </p>
      <button target="_blank" href={this.props.url}>pay now</button>
      <button onClick= {e=>this.props.showDetailed(this.props.id)}>v</button>
      <p>---------------------------------------------------------------------------</p>
    </div>
  ) 
=======
import { connect } from 'react-redux';

class AccountCard extends React.Component {
  earliest(array) {
    if (array.length > 1) {
      array.reduce(function(pre, cur) {
        return Date.parse(pre) > Date.parse(cur) ? cur : pre;
      });
    } else return array[0];
  }

  render() {
    let mostRecent, unpaidBills, dueDates, earliestDate;

    if (this.props.bills) {
      unpaidBills = this.props.bills.filter(item => item.isPaid === false);
      dueDates = unpaidBills.map(item => (item = item.dueDate));
      earliestDate = this.earliest(dueDates);
      mostRecent = unpaidBills.find(item => item.dueDate === earliestDate);
    }

    return (
      <div className="account-box">
        <h4>{this.props.name}</h4>
        <p>due date: {mostRecent.dueDate} </p>
        <p>amount due: {mostRecent.amount ? mostRecent.amount : 'TBD'} </p>
        <button target="_blank" href={this.props.url}>
          pay now
        </button>
        <button onClick={e => this.props.showDetailed(this.props.id)}>v</button>
        <p>
          ---------------------------------------------------------------------------
        </p>
      </div>
    );
>>>>>>> 8fe5539705bb5d7c615547b985e7a2645ed4a1b5
  }
}

export default connect()(AccountCard);
