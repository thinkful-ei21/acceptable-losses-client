import React from 'react';
import { connect } from 'react-redux';

// import { getAccounts } from '../actions/accounts';
import requiresLogin from './require-login';

// import SummaryDisplay from './summary/summary-display';
// import UpcomingBills from './summary/upcoming-bills';

export class Profile extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(getAccounts());
  // }

  render() {
    return (
      <div>
        <h2>{this.props.user.firstName}</h2>
        <p>Image from cloudinary goes here</p>
        <button>Add Photo</button>
        <section>
          <h3>Manage Profile</h3>
          <span>Manage Your profile configs here</span>
          <ul>
            <li>
              <button>Update Email</button>
              <span>Update Your Email Address</span>
            </li>
            <li>
              <button>Change Password</button>
              <span>Change Your Password</span>
            </li>
            <li>
              <button>Update Name</button>
              <span>Update Your First or Last Name</span>
            </li>
            <li>
              <button>Delete User</button>
              <span>Delete User Account</span>
            </li>
          </ul>

          <h3>Manage Income</h3>
          <span>Manage All Your Incomes Here</span>
          <ul>
            <li>
              <button>Income</button>
              <span>Navigate to income</span>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Profile));
