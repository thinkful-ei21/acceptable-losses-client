import React from 'react';
import { connect } from 'react-redux';
import AccountCard from './account-card';
import AccountView from './account-details';
import requiresLogin from './require-login';
import SearchBar from './search-bar';
import { getAccount } from '../actions/accounts';

export class Accounts extends React.Component {
<<<<<<< HEAD

    showDetailed(id){
        this.props.dispatch(getAccount(id))
    };

    render() {
        let accountResults;
        let accountsSorted;
        if (this.props.accounts){
            accountsSorted= this.props.accounts.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            if(this.props.alphaSort){
                accountsSorted= accountsSorted.reverse();
            }
            accountResults= accountsSorted.map(account=>
                <AccountCard showDetailed={id => this.showDetailed(id)} key={account.id}{...account}/>)
        };
        return (
            <div className="accounts">
                <h3>Accounts</h3>
                <SearchBar />
                <AccountView/>
                <p>---------------------------------------------------------------------------</p>
                {accountResults}
            </div>
        );
=======
  showDetailed(id) {
    this.props.dispatch(getAccount(id));
  }

  render() {
    let accountResults;
    if (this.props.accounts) {
      accountResults = this.props.accounts.map(account => (
        <AccountCard
          showDetailed={id => this.showDetailed(id)}
          key={account.id}
          {...account}
        />
      ));
>>>>>>> 8fe5539705bb5d7c615547b985e7a2645ed4a1b5
    }
    return (
      <div className="accounts">
        <h3>Accounts</h3>
        <SearchBar />
        <AccountView />
        <p>
          ---------------------------------------------------------------------------
        </p>
        {accountResults}
      </div>
    );
  }
}

const mapStateToProps = state => {
<<<<<<< HEAD

    return {
        alphaSort: state.accounts.alphaSort,
        dateSort: state.accounts.dateSort,
        accounts: state.accounts.accounts.filter(item=> 
            item.name.toLowerCase().includes(state.accounts.searchTerm) || 
            item.url.toLowerCase().includes(state.accounts.searchTerm) ||
            item.bills.find(item=> item.dueDate.includes(state.accounts.searchTerm)) ||
            item.bills.find(item=> item.frequency=== state.accounts.searchTerm) ||
            item.bills.find(item=> item.amount === state.accounts.searchTerm)

            )
    };
=======
  return {
    accounts: state.accounts.accounts.filter(
      item =>
        item.name.toLowerCase().includes(state.accounts.searchTerm) ||
        item.url.toLowerCase().includes(state.accounts.searchTerm) ||
        item.bills.find(item =>
          item.dueDate.includes(state.accounts.searchTerm)
        ) ||
        item.bills.find(item => item.frequency === state.accounts.searchTerm) ||
        item.bills.find(item => item.amount === state.accounts.searchTerm)
    )
  };
>>>>>>> 8fe5539705bb5d7c615547b985e7a2645ed4a1b5
};

export default requiresLogin()(connect(mapStateToProps)(Accounts));
