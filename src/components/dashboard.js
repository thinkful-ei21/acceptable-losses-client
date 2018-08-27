import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './require-login';
import { getAccounts } from '../actions/accounts';
import SummaryDisplay from './summary/summary-display';
import UpcomingBills from './summary/upcoming-bills';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAccounts());
  }

  render() {
    return (
      <div>
        <h3>
          Hello {this.props.user.firstName} {this.props.user.lastName}!
        </h3>
        <SummaryDisplay />
        <span>________________________________________________________</span>
        <UpcomingBills />
        <span>________________________________________________________</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
