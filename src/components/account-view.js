import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './require-login';

export class AccountView extends React.Component {
  render() {
    return (
      <div className="account-view">
        <h2>{this.props.selectedAccount.name}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedAccount: state.accounts.account
  };
};

export default requiresLogin()(connect(mapStateToProps)(AccountView));
