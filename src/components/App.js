import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { refreshAuthToken } from '../actions/auth';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import HeaderBar from './header';
import Accounts from './accounts-page';
import RegistrationPage from './registration-page';
import loginPage from './login-page';
import AddBillForm from './add-bill-form';
import IncomeForm from './income-form';
import Incomes from './income-page';

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
      <div className="">
        <header className="" />
        <div className="app">
          <Route path="" component={HeaderBar} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/accounts" component={Accounts} />
          <Route exact path="/add-account" component={AddBillForm} />
          <Route path="/income" component={Incomes} />
          <Route exact path="/add-income" component={IncomeForm} />
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
