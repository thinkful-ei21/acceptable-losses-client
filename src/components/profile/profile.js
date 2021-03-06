import React from 'react';
import { connect } from 'react-redux';

import {
  showChangePasswordForm,
  hideChangePasswordForm,
  showEditInfoForm,
  hideEditInfoForm,
  showConfirmDeleteUser,
  hideConfirmDeleteUser
} from '../../actions/profile';
import { deleteUser, uploadImage, deleteImage } from '../../actions/auth';

import requiresLogin from '../require-login';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';

import EditInfoForm from './edit-info-form';
import ChangePasswordForm from './change-password-form';
import Incomes from '../income/income-page.js';

import buttonStyles from '../styles/buttons.module.css';
import styles from '../styles/settings.module.css';
import formStyles from '../styles/forms.module.css';
import '../styles/inputfile.css';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleIncome: false
    };
  }

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

  toggleIncomeInfo() {
    this.setState({
      toggleIncome: !this.state.toggleIncome
    });
  }

  render() {
    const { changePasswordForm, editInfoForm, confirmDeleteUser, dispatch, user, uploading } = this.props;
    const { profilePic } = user;
    let form, userImg, uploadButtons, mainContent;

    if (changePasswordForm && !editInfoForm && !confirmDeleteUser) {
      form = <ChangePasswordForm />;
    }
    if (!changePasswordForm && editInfoForm && !confirmDeleteUser) {
      form = <EditInfoForm />;
    }
    if (!changePasswordForm && !editInfoForm && confirmDeleteUser) {
      form = (
        <div className={`${formStyles.settingsDeleteUser} ${styles.form}`}>
          <h4>WARNING!</h4>
          <p>Deleting your account will result in permanent deletion of all user data.</p>
          <p>Are you sure you want to delete?</p>
          <div className={formStyles.settingsFormButtons}>
            <button className={buttonStyles.form} onClick={() => this.confirmDelete()}>
              Delete
            </button>
            <button className={buttonStyles.form} onClick={() => dispatch(hideConfirmDeleteUser())}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (profilePic && profilePic.public_id && profilePic.secure_url) {
      userImg = (
        <img key={profilePic.public_id} src={profilePic.secure_url} alt="Your Ugly Mug :)" className={styles.userImg} />
      );
    } else {
      userImg = (
        <img src={require('../../assets/no-profile-image.png')} alt="missing profile pic" className={styles.userImg} />
      );
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
          <label htmlFor="file">
            <strong>Upload an Image</strong>
          </label>
          <input className={styles.inputfile} type="file" onChange={e => this.upload(e)} />
        </React.Fragment>
      );
    } else {
      uploadButtons = (
        <React.Fragment>
          <div>
            <input className="inputfile" name="file" id="file" type="file" onChange={e => this.upload(e)} />
            <label htmlFor="file">Edit Image</label>
          </div>

          <button className="delButton" onClick={() => dispatch(deleteImage(profilePic.public_id))}>
            Delete
          </button>
        </React.Fragment>
      );
    }

    mainContent = (
      <section className={styles.allContent}>
        <div className={styles.imageContainer}>{userImg}</div>
        <div className={styles.uploadImgButton}>{uploadButtons}</div>

        <h3 className={styles.h3}>Manage Profile</h3>

        <div className={styles.labelAndButton}>
          <p>Update Your First Name, Last Name, Email Address.</p>
          <button className={`${buttonStyles.form} ${styles.button}`} onClick={() => this.showEditInfoForm()}>
            Update Your Info
          </button>
        </div>

        <div className={styles.labelAndButton}>
          <p>Change Your Password.</p>
          <button className={`${buttonStyles.form} ${styles.button}`} onClick={() => this.showChangePasswordForm()}>
            Change Password
          </button>
        </div>

        <div className={styles.labelAndButton}>
          <p>Delete User Account.</p>
          <button className={`${buttonStyles.form} ${styles.button}`} onClick={() => this.deleteUser()}>
            Delete User
          </button>
        </div>

        <h3 className={styles.h3}>Manage Incomes</h3>
        <div className={styles.labelAndButton}>
          <p>Update Incomes</p>
          <button className={`${buttonStyles.form} ${styles.button}`} onClick={() => this.toggleIncomeInfo()}>
            Incomes
          </button>
        </div>
      </section>
    );

    if (this.state.toggleIncome) {
      form = <Incomes hideIncome={this.toggleIncomeInfo.bind(this)} />;
    }

    return (
      <div className={styles.wholePage}>
        <h2 className={styles.h2}>Settings</h2>
        
        <div className={styles.mobileView}>{!form ? mainContent : form}</div>

        <div className={styles.desktopView}>
          {mainContent}
          {form}
        </div>
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
