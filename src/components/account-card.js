import React from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { link } from 'fs';
=======
import {connect} from 'react-redux';
>>>>>>> ba19cfe367d949d7974820b25cc90e24915f733f

class AccountCard extends React.Component {
  // earliest(array){
  //   if(array.length>1){
  //   array.reduce(function (pre, cur) {
  //     return Date.parse(pre) > Date.parse(cur) ? cur : pre;
  //   })}
  //   else return array[0];
  // };

  oldest(bills) {
    let result = bills[0];
    for (let i = bills.length - 1; i >= 0; i--) {
      if (bills[i].paid === true) {
        result = bills[i + 1];
      }
    }
    return result;
  }

<<<<<<< HEAD
  render() {
    let billsList = this.props.bills;
    let result = this.oldest(billsList);
=======
  render(){
  let billsList= this.props.bills;
  let result= this.oldest(billsList)
>>>>>>> ba19cfe367d949d7974820b25cc90e24915f733f
    // let mostRecent, unpaidBills, dueDates, earliestDate;

    // if(this.props.bills){
    //   unpaidBills = this.props.bills.filter(item=> item.isPaid === false);
    //   dueDates= unpaidBills.map(item => item =item.dueDate);
    //   earliestDate= this.earliest(dueDates);
    //   mostRecent = unpaidBills.find(item => item.dueDate === earliestDate);
    // };
    return (
      <div className="account-box">
        <h4>{this.props.name}</h4>
        <p>due date: {result.dueDate} </p>
        <p>amount due: {result.amount ? result.amount : 'TBD'} </p>
        <button target="_blank" href={this.props.url}>
          pay now
        </button>
        <button onClick={e => this.props.showDetailed(this.props.id)}>v</button>
        <p>
          ---------------------------------------------------------------------------
        </p>
      </div>
    );
  }
}

export default connect()(AccountCard);
