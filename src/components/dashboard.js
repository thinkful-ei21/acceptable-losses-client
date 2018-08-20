import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './require-login';
 

export class Dashboard extends React.Component {
    componentDidMount(){
    };



    render() {
        return (
            <div className="dashboard">
                <h3>Hello there</h3>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
    };
};


export default requiresLogin()(connect(mapStateToProps)(Dashboard));