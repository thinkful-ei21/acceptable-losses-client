import React from 'react';
import {connect} from 'react-redux';
import AccountCard from './account-card';
import AccountView from './account-details';
import requiresLogin from './require-login';
import SearchBar from './search-bar';
import { getAccount } from '../actions/accounts';


 

export class Accounts extends React.Component {

    showDetailed(id){
        this.props.dispatch(getAccount(id))
    };

    render() {
        let accountResults;
        if (this.props.accounts){
            accountResults= this.props.accounts.map(account=>
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
    }
}

const mapStateToProps = state => {

    return {
        
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