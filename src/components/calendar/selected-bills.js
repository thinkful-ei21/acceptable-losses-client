import React from 'react';
import { connect } from 'react-redux';
import AccountCard from '../account/account-card';
import moment from 'moment';
import { getDaysBills, getAccounts } from '../../actions/accounts';
import '../styles/calendar.css';
import styles from '../styles/summary.module.css';

export class SelectedBills extends React.Component {
  componentDidMount() {
    this.props.dispatch(getDaysBills(this.props.selectedDay));
    this.props.dispatch(getAccounts());
  }
  render() {
    let selectedDay, billsHistory;
    if (this.props.selectedDay) {
      selectedDay = moment(this.props.selectedDay).format('MMM Do, YYYY');
      billsHistory = this.props.accounts.map((account, index) => (
        <AccountCard key={index} {...account} styles={styles} />
      ));
    }
    return (
      <div className="selectedBills">
        <h3 className={styles.h3}>{selectedDay ? selectedDay : 'Select a date..'}</h3>
        <ul>{billsHistory}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  selectedDay: state.accounts.selectedDay,
  daysBills: state.accounts.daysBills
});

export default connect(mapStateToProps)(SelectedBills);
