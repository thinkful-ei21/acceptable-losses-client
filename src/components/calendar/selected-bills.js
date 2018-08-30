import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
import AccountCardPaid from '../account/account-card-paid';
import  moment  from 'moment';
import {getDaysBills,getAccounts } from '../../actions/accounts';



export class SelectedBills extends React.Component {
  componentDidMount() {
    this.props.dispatch(getDaysBills(this.props.selectedDay));
    this.props.dispatch(getAccounts());
  }
  render() {
    let billsDue, selectedDay, billsHistory;
    if(this.props.selectedDay){
      selectedDay= moment(this.props.selectedDay).format('MMM Do, YYYY');
      billsDue = this.props.daysBills.map((account, index) => <AccountCard key={index} {...account} />);
      billsHistory = this.props.accounts.map((account, index) => <AccountCardPaid key={index} {...account} />);
    }
    return ( 
      <div>
        <h2>{selectedDay}</h2>                             
        <ul>
          {billsDue}
        </ul>
        <ul>
        {billsHistory}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts:state.accounts.accounts,
  selectedDay: state.accounts.selectedDay,
  daysBills: state.accounts.daysBills
});

export default connect(mapStateToProps)(SelectedBills);