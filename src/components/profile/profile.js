import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  showChangePasswordForm,
  hideChangePasswordForm,
  showEditInfoForm,
  hideEditInfoForm,
  showConfirmDeleteUser,
  hideConfirmDeleteUser
} from '../../actions/profile';
import { deleteUser, uploadImage, deleteImage } from '../../actions/auth';

import buttonStyles from '../styles/buttons.module.css';
import requiresLogin from '../require-login';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';

import EditInfoForm from './edit-info-form';
import ChangePasswordForm from './change-password-form';

import styles from '../styles/settings.module.css';

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
    const { changePasswordForm, editInfoForm, confirmDeleteUser, dispatch, user, uploading } = this.props;
    const { firstName, profilePic } = user;
    let form, userImg, uploadButtons;

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

    if (profilePic && profilePic.public_id && profilePic.secure_url) {
      userImg = <img key={profilePic.public_id} src={profilePic.secure_url} alt="Your Ugly Mug :)" />;
    } else {
      userImg = <img src={require('../../assets/no-profile-image.png')} alt="missing profile pic" />;
    }

    if (uploading) {
      uploadButtons = (
        <React.Fragment>
          <p>Uploading Image... Please Wait</p>
        </React.Fragment>
      );
    } else if (!profilePic.public_id && !profilePic.secure_url && !uploading) {
      uploadButtons = (
        <React.Fragment>
          <p>Upload an Image</p>
          <input type="file" onChange={e => this.upload(e)} />
        </React.Fragment>
      );
    } else {
      uploadButtons = (
        <React.Fragment>
          <p>Edit Image</p>
          <input type="file" onChange={e => this.upload(e)} />
          <button className={buttonStyles.form} onClick={() => dispatch(deleteImage(profilePic.public_id))}>
            Delete
          </button>
        </React.Fragment>
      );
    }

    return (
      <div className={styles.wholePage}>
        <h2 className={styles.h2}>Settings</h2>
        {/* <h2>{firstName}</h2> */}

        <section className={styles.allContent}>
          <h3 className={styles.h3}>Manage Profile</h3>
          {form}

          {userImg}
          <div>{uploadButtons}</div>

          <p>Update Your First Name, Last Name, Email Address.</p>
          <button className={buttonStyles.form} onClick={() => this.showEditInfoForm()}>
            Update Your Info
          </button>

          <p>Change Your Password.</p>
          <button className={buttonStyles.form} onClick={() => this.showChangePasswordForm()}>
            Change Password
          </button>

          <p>Delete User Account.</p>
          <button className={buttonStyles.form} onClick={() => this.deleteUser()}>
            Delete User
          </button>

          <h3>Manage Incomes</h3>
          <p>Update incomes</p>
          <Link to="/incomes">
            <button className={buttonStyles.form}>Incomes</button>
          </Link>
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
  image: state.profile.image,
  uploading: state.auth.uploading
});

export default requiresLogin()(connect(mapStateToProps)(Profile));
