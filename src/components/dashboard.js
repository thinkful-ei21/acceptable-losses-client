import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './require-login';
import { getAccounts } from '../actions/accounts';
import SummaryDisplay from './summary-display';
import UpcomingBills from './upcoming-bills';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

  render() {
    return (
      <div className="dashboard">
        <h3>Hello there: USER'S NAME</h3>
        <SummaryDisplay />
        <span>________________________________________________________</span>
        <UpcomingBills />
        <span>________________________________________________________</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
