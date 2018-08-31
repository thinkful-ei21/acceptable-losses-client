import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { togglePay, getAccount } from '../../actions/accounts';
import AccountPay from './account-pay-form';

import styles from '../styles/summary.module.css';
import buttonStyles from '../styles/buttons.module.css';

class AccountCard extends React.Component {
  render() {
    const { nextDue, id, url, dispatch, name, payButtonToggle } = this.props;
    let finalAmount = Number(nextDue.amount).toFixed(2);
    console.log(nextDue.dueDate + '' + name)
    return (
      <li>
        <Link to="/app/accounts" className={styles.accDetailsLink}>
          <h4 onClick={() => dispatch(getAccount(id))}>{name}</h4>
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

          <div className={styles.centerButtons}>
            {payButtonToggle === id ? (
              <AccountPay />
            ) : (
              <button
                className={buttonStyles.markAsPaid}
                onClick={() => {
                  return dispatch(getAccount(id)).then(() => dispatch(togglePay(id)));
                }}
              >
                Mark as Paid
              </button>
            )}
            {url && !payButtonToggle ? (
              <button className={buttonStyles.payHere}>
                <a target="_blank" href={url}>
                  Pay Here
                </a>
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  payButtonToggle: state.accounts.payButtonToggle
});

export default connect(mapStateToProps)(AccountCard);
