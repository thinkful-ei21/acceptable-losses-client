import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AccountPay from './account-pay-form';

import { togglePay, getAccount, toggleWeb } from '../../actions/accounts';

import buttonStyles from '../styles/buttons.module.css';


class AccountCardPaid extends React.Component {
  webToggle() {
    const { dispatch, id } = this.props;
    return dispatch(toggleWeb(id));
  }
  render() {
    const { bills, id, dispatch, name, key, styles, selectedDay, nextDue,url, frequency,payButtonToggle} = this.props;

    let finalAmount, buttons;
    if(nextDue){ finalAmount= Number(nextDue.amount).toFixed(2);}

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


    let paidBill = bills.find(
      bill =>
        moment(bill.dueDate).format('YYYY-MM-DD') === moment(selectedDay).format('YYYY-MM-DD') &&
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
        <div className={styles.tabletViewBillInfo}>
          <div className={styles.info}>
            <div>
            <p className={styles.dueLabel}>Paid:</p> 
              <p className={styles.due}>{moment(paidBill.datePaid).format('MMM Do, YYYY')} </p>
            </div>
            <div>
              <p className={styles.amountLabel}>Amount:</p> 
              <p className={styles.amount} >${Number(paidBill.amount).toFixed(2)} </p>
            </div>
          </div>
        </div>
        </li>
      );
    }
    if(moment(nextDue.dueDate).format('YYYY-MM-DD')===moment(selectedDay).format('YYYY-MM-DD')){
      return (
        <li className={styles.li} key={key}>
          <Link to="/app/accounts" className={styles.accDetailsLink}>
            <h4 className={styles.h4}onClick={() => dispatch(getAccount(id))}>
              {name}
            </h4>
          </Link>
        <div className={styles.tabletViewBillInfo}>
          <div className={styles.info}>
            <div>
            <p className={styles.dueLabel}>Frequency:</p> 
              <p className={styles.due}>{frequency} </p>
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
    return '';
  }
}

const mapStateToProps = state => ({
  selectedDay: state.accounts.selectedDay,  
  payButtonToggle: state.accounts.payButtonToggle,
  toggleWeb: state.accounts.toggleWeb
});

export default connect(mapStateToProps)(AccountCardPaid);
