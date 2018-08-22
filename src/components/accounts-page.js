import React from 'react';
import {connect} from 'react-redux';
import AccountCard from './account-card';
import requiresLogin from './require-login';
import SearchForm from './search-bar';
import { getAccounts } from '../actions/accounts';

 

export class Accounts extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAccounts());
      }

    render() {
        let accountResults;
        if (this.props.accounts){
            accountResults= this.props.accounts.map(account=>
                <AccountCard key={account.id}{...account}/>)
        };
        return (
            <div className="accounts">
                <h3>Accounts</h3>
                <SearchForm />
                {accountResults}
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        searchTerm:state.accounts.searchTerm,
        accounts: state.accounts.accounts.filter(item=> 
            item.name.toLowerCase().includes(state.accounts.searchTerm) || 
            item.url.toLowerCase().includes(state.accounts.searchTerm) ||
            item.bills.find(item=> item.dueDate.includes(state.accounts.searchTerm)) ||
            item.bills.find(item=> item.frequency=== state.accounts.searchTerm) ||
            item.bills.find(item=> item.amount === state.accounts.searchTerm)

            )
    };
};


export default requiresLogin()(connect(mapStateToProps)(Accounts));