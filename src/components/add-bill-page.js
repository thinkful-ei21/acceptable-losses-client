import React from 'react';
import { connect } from 'react-redux';

import AddBillForm from './add-bill-form';

export function AddBillPage(props) {
  return (
    <div className="add-bill">
      <AddBillForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AddBillPage);
