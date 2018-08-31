import React from 'react';
import { connect } from 'react-redux';

import { getAccounts } from '../actions/accounts';
import requiresLogin from './require-login';

import SummaryDisplay from './summary/summary-display';
import UpcomingBills from './summary/upcoming-bills';

import styles from './styles/summary.module.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAccounts());
  }

  render() {
    const { firstName, lastName } = this.props.user;
    return (
      <div>
        <h2 className={styles.h2}>
          Hello {firstName} {lastName}!
        </h2>
        <div className={styles.desktopView}>
          <SummaryDisplay />
          <UpcomingBills />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
