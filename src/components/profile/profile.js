import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  showChangePasswordForm,
  hideChangePasswordForm,
  showEditInfoForm,
  hideEditInfoForm,
  showConfirmDeleteUser,
  hideConfirmDeleteUser,
  uploadImage
} from '../../actions/profile';
import { deleteUser } from '../../actions/auth';

import buttonStyles from '../styles/buttons.module.css';
import requiresLogin from '../require-login';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';

import EditInfoForm from './edit-info-form';
import ChangePasswordForm from './change-password-form';

export class Profile extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(hideEditInfoForm());
    dispatch(hideChangePasswordForm());
    dispatch(hideConfirmDeleteUser());
  }

  confirmDelete() {
    const { dispatch } = this.props;
    dispatch(deleteUser());
    dispatch(clearAuth());
    clearAuthToken();
  }

  showEditInfoForm() {
    const { dispatch } = this.props;
    dispatch(hideChangePasswordForm());
    dispatch(hideConfirmDeleteUser());
    dispatch(showEditInfoForm());
  }

  showChangePasswordForm() {
    const { dispatch } = this.props;
    dispatch(hideEditInfoForm());
    dispatch(hideConfirmDeleteUser());
    dispatch(showChangePasswordForm());
  }

  deleteUser() {
    const { dispatch } = this.props;
    dispatch(hideEditInfoForm());
    dispatch(hideChangePasswordForm());
    dispatch(showConfirmDeleteUser());
  }

  upload(e) {
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('fileName', e.target.files[0]);
    dispatch(uploadImage(formData));
  }

  render() {
    const { changePasswordForm, editInfoForm, confirmDeleteUser, dispatch, user, image } = this.props;
    const { firstName } = user;
    let form, userImg;
    if (changePasswordForm && !editInfoForm && !confirmDeleteUser) {
      form = <ChangePasswordForm />;
    }
    if (!changePasswordForm && editInfoForm && !confirmDeleteUser) {
      form = <EditInfoForm />;
    }
    if (!changePasswordForm && !editInfoForm && confirmDeleteUser) {
      form = (
        <div>
          <p>
            <span>WARNING!</span>
            Deleting your account will result in permanent deletion of all user data.
            <span>Are you sure you want to delete?</span>
          </p>
          <button className={buttonStyles.form} onClick={() => this.confirmDelete()}>
            Delete
          </button>
          <button className={buttonStyles.form} onClick={() => dispatch(hideConfirmDeleteUser())}>
            Cancel
          </button>
        </div>
      );
    }

    if (image) {
      userImg = <img key={image.public_id} src={image.secure_url} />;
    } else {
      userImg = <div>Need a Pic</div>;
    }

    return (
      <div>
        <h2>{firstName}</h2>
        {userImg}
        <input type="file" onChange={e => this.upload(e)} />
        {form}
        <section>
          <h3>Manage Profile</h3>
          <p>Manage Your Profile Configs Here.</p>
          <button className={buttonStyles.form} onClick={() => this.showEditInfoForm()}>
            Update Your Info
          </button>
          <p>Update Your First Name, Last Name, Email Address.</p>
          <button className={buttonStyles.form} onClick={() => this.showChangePasswordForm()}>
            Change Password
          </button>
          <p>Change Your Password.</p>
          <button className={buttonStyles.form} onClick={() => this.deleteUser()}>
            Delete User
          </button>
          <p>Delete User Account.</p>
          <h3>Manage Income</h3>
          <p>Manage All Your Incomes Here.</p>
          <Link to="/incomes">
            <button className={buttonStyles.form}>Incomes</button>
          </Link>
          <p>Navigate to income.</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  changePasswordForm: state.profile.toggleChangePasswordForm,
  editInfoForm: state.profile.toggleEditInfoForm,
  confirmDeleteUser: state.profile.toggleConfirmDelete,
  image: state.profile.image
});

export default requiresLogin()(connect(mapStateToProps)(Profile));
