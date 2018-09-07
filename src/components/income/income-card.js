import React from 'react';
import { connect } from 'react-redux';

import { deleteIncome, getIncome, showUpdateForm, hideIncomeForm } from '../../actions/incomes';

import styles from '../styles/settings.module.css';
import cardStyles from '../styles/accountPage.module.css';
import buttonStyles from '../styles/buttons.module.css';

export class IncomeCard extends React.Component {
  toggleUpdate(id) {
    const { dispatch } = this.props;
    return dispatch(getIncome(id))
      .then(() => dispatch(hideIncomeForm()))
      .then(() => dispatch(showUpdateForm()));
  }

  render() {
    const { key, source, amount, id, dispatch } = this.props;
    return (
      <li key={key} className={styles.incomeLi}>
        <button onClick={() => this.toggleUpdate(id)} className={buttonStyles.editting}>
          <img src={require('../../assets/edit.svg')} alt="Edit icon" />
        </button>
        <button onClick={() => dispatch(deleteIncome(id))} className={buttonStyles.editting}>
          <img src={require('../../assets/delete.svg')} alt="Delete icon" />
        </button>

        <div className={styles.incomeInfo}>
          <div>
            <p className={cardStyles.amountLabel}>Source:</p>
            <p className={cardStyles.due}>{source}</p>
          </div>
          <div>
            <p className={cardStyles.amountLabel}>Amount:</p>
            <p className={cardStyles.amount}>${Number(amount).toFixed(2)}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default connect()(IncomeCard);
