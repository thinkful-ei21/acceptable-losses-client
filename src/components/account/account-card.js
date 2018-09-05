import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { togglePay, getAccount, toggleWeb, updateAccount } from '../../actions/accounts';
import AccountPay from './account-pay-form';
import Input from '../input';
import { Field, reduxForm, focus } from 'redux-form';

// import styles from '../styles/summary.module.css';
import buttonStyles from '../styles/buttons.module.css';

class AccountCard extends React.Component {
  // webToggle(id) {
  //   return dispatch(toggleWeb(id));
  // }

  onSubmit(value) {
    const { name, frequency, id, reminder, dispatch } = this.props;
    const newAccount = {
      reminder,
      name,
      frequency,
      url: value.url
    };
    return dispatch(updateAccount(newAccount, id))
      .then(() => dispatch(getAccount(id)))
      .then(() => dispatch(toggleWeb(null)));
  }

  render() {
    const {
      nextDue,
      id,
      url,
      dispatch,
      name,
      payButtonToggle,
      styles,
      handleSubmit,
      pristine,
      submitting,
      toggleWebForm
    } = this.props;

    let finalAmount, buttons;
    if (nextDue) {
      finalAmount = Number(nextDue.amount).toFixed(2);
    }

    const markAsPaid = (
      <button
        className={buttonStyles.markAsPaid}
        onClick={() => dispatch(getAccount(id)).then(() => dispatch(togglePay(id)))}
      >
        Mark as Paid
      </button>
    );

    if (payButtonToggle === id) {
      buttons = <AccountPay />;
    } else if (!payButtonToggle && toggleWebForm === id) {
      buttons = (
        <form id="website" onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor="website" />
          <Field component={Input} type="text" name="url" placeholder="add website" />
          <button type="submit" disabled={pristine || submitting}>
            Save
          </button>
          <button onClick={() => dispatch(toggleWeb(null))}>X</button>
        </form>
      );
    } else if (!payButtonToggle && !toggleWebForm && url) {
      buttons = (
        <React.Fragment>
          {markAsPaid}
          <button className={buttonStyles.payHere}>
            <a target="_blank" href={url}>
              Pay Here
            </a>
          </button>
        </React.Fragment>
      );
    } else if (!payButtonToggle && !toggleWebForm && !url) {
      buttons = (
        <React.Fragment>
          {markAsPaid}
          <button onClick={() => dispatch(toggleWeb(id))}>Add Website</button>
        </React.Fragment>
      );
    }

    if (nextDue) {
      return (
        <li className={styles.li}>
          <Link to="/app/accounts" className={styles.accDetailsLink}>
            <h4 className={styles.h4} onClick={() => dispatch(getAccount(id))}>
              {name}
            </h4>
          </Link>
          <div className={styles.tabletViewBillInfo}>
            <div className={styles.info}>
              <div>
                <p className={styles.dueLabel}>Due Date:</p>
                <p className={styles.due}>{moment(nextDue.dueDate).format('MMM Do, YYYY')}</p>
              </div>
              <div>
                <p className={styles.amountLabel}>Amount:</p>
                <p className={styles.amount}>${nextDue.amount ? finalAmount : ' ---'}</p>
              </div>
            </div>

            <div className={styles.centerButtons}>{buttons}</div>
          </div>
        </li>
      );
    } else {
      return (
        <li className={styles.li}>
          <Link to="/app/accounts" className={styles.accDetailsLink}>
            <h4 className={styles.h4} onClick={() => dispatch(getAccount(id))}>
              {name}
            </h4>
          </Link>
        </li>
      );
    }
  }
}

const mapStateToProps = state => ({
  payButtonToggle: state.accounts.payButtonToggle,
  toggleWebForm: state.accounts.toggleWeb
});

const accountCard = connect(mapStateToProps)(AccountCard);
// export default

export default reduxForm({
  form: 'website',
  onSubmitFail: (errors, dispatch) => dispatch(focus('website', Object.keys(errors)[0]))
})(accountCard);
