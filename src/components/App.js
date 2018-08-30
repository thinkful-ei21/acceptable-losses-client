import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { refreshAuthToken } from '../actions/auth';

import LandingPage from './landing-page';
import Dashboard from './dashboard';
import HeaderBar from './header';
import AccountsPage from './account/accounts-page';
import RegistrationPage from './registration-page';
import loginPage from './login-page';
import AddBillForm from './account/add-bill-form';
import Calendar from './calendar/calendar';

import IncomeForm from './income/income-form';
import Incomes from './income/income-page';

import styles from './styles/app.module.css';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(() => this.props.dispatch(refreshAuthToken()), 60 * 60 * 1000);
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/register" component={RegistrationPage} />
        </div>
        <div className={styles.background}>
          <Route path="/app" component={HeaderBar} />
          <Route exact path="/app/dashboard" component={Dashboard} />
          <Route path="/app/accounts" component={AccountsPage} />
          <Route exact path="/app/add-account" component={AddBillForm} />
          <Route path="/incomes" component={Incomes} />
          <Route exact path="/calendar" component={Calendar} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});
export default withRouter(connect(mapStateToProps)(App));
