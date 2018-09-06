import React from 'react';
import { connect } from 'react-redux';

import { deleteIncome, getIncome, showUpdateForm, hideIncomeForm } from '../../actions/incomes';

import styles from '../styles/settings.module.css';
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
          <p>{source}</p>
          <p>${Number(amount).toFixed(2)}</p>
        </div>
      </li>
    );
  }
}

export default connect()(IncomeCard);
