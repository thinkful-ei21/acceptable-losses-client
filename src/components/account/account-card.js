import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { payBill, getAccount } from '../../actions/accounts';

import styles from '../styles/summary.module.css';
import buttonStyles from '../styles/buttons.module.css';

class AccountCard extends React.Component {
  render() {
    const { nextDue, id, url, dispatch, name, key } = this.props;
    let finalAmount = Number(nextDue.amount).toFixed(2);

    return (
      <li key={key}>
        <Link to="/app/accounts"
          className={styles.accDetailsLink}
        >
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
            <button className={buttonStyles.markAsPaid}
              onClick={e => dispatch(payBill(nextDue, id))}
            >
              Mark as Paid
            </button>
            <button className={buttonStyles.payHere}>
              <a target="_blank" href={url}>
                Pay Here
              </a>
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default connect()(AccountCard);
