import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
import  moment  from 'moment';

export class TodaysBills extends React.Component {
  render() {
    let billsResults, selectedDay;
    if(this.props.selectedDay){
      selectedDay= moment(this.props.selectedDay).format('MMM Do, YYYY');
      billsResults = this.props.daysBills.map((account, index) => <AccountCard key={index} {...account} />);
    }
    return (
      <div>
        <h2>{selectedDay}</h2>
        <ul>
          {billsResults}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDay: state.accounts.selectedDay,
  daysBills: state.accounts.daysBills
});

export default connect(mapStateToProps)(TodaysBills);