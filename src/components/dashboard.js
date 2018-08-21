import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './require-login';
import AddBillForm from './add-bill-form';
 

export class Dashboard extends React.Component {
    componentDidMount(){
        // dispatch get all accounts
    };

    render() {
        return (
            <div className="dashboard">
                <h3>Hello there</h3>
                <AddBillForm/>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
    };
};


export default requiresLogin()(connect(mapStateToProps)(Dashboard));