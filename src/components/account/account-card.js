import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { togglePay, getAccount, toggleWeb } from '../../actions/accounts';
import AccountPay from './account-pay-form';

import styles from '../styles/summary.module.css';
import buttonStyles from '../styles/buttons.module.css';

class AccountCard extends React.Component {
  webToggle() {
    const { dispatch, id } = this.props;
    return dispatch(toggleWeb(id));
  }

  render() {
    const { nextDue, id, url, dispatch, name, payButtonToggle } = this.props;
    let finalAmount = Number(nextDue.amount).toFixed(2);
    let buttons;
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
    } else if (payButtonToggle === null && url) {
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
    } else if (payButtonToggle === null && !url) {
      buttons = (
        <React.Fragment>
          {markAsPaid}
          <button onClick={() => this.webToggle(true)}>Add Website</button>
        </React.Fragment>
      );
    }

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
  }
}

const mapStateToProps = state => ({
  payButtonToggle: state.accounts.payButtonToggle,
  toggleWeb: state.accounts.toggleWeb
});

export default connect(mapStateToProps)(AccountCard);
