import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getAccount } from '../../actions/accounts';



class AccountCardPaid extends React.Component {
  render() {
    const { bills, id, dispatch, name, key, styles} = this.props;
    let paidBill = bills.find(
      bill =>
        moment(bill.dueDate).format('YYYY-MM-DD') === moment(this.props.selectedDay).format('YYYY-MM-DD') &&
        bill.datePaid !== null
    );

    if (paidBill) {
      return (
        <li className={styles.li} key={key}>
          <Link to="/app/accounts" className={styles.accDetailsLink}>
            <h4 className={styles.h4}onClick={() => dispatch(getAccount(id))}>
              {name}
            </h4>
          </Link>
          <div>
            <p className={styles.dueLabel}>Due:</p>
            <p className={styles.due}>{moment(paidBill.dueDate).format('MMM Do, YYYY')} </p>
          </div>
          <div>
            <p className={styles.dueLabel}>Paid:</p> 
            <p className={styles.due}>{moment(paidBill.datePaid).format('MMM Do, YYYY')} </p>
          </div>
          <div>
            <p className={styles.amountLabel}>Amount:</p> 
            <p className={styles.amount} >${Number(paidBill.amount).toFixed(2)} </p>
          </div>
          <hr />
        </li>
      );
    }
    return '';
  }
}

const mapStateToProps = state => ({
  selectedDay: state.accounts.selectedDay
});

export default connect(mapStateToProps)(AccountCardPaid);
