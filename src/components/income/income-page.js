import React from 'react';
import { connect } from 'react-redux';

import {
  getIncomes,
  getIncome,
  showUpdateForm,
  hideUpdateForm,
  showIncomeForm,
  hideIncomeForm
} from '../../actions/incomes';

import IncomeCard from './income-card';
import IncomeForm from './income-form';
import UpdateIncome from './update-income';
import requiresLogin from '../require-login';

import styles from '../styles/settings.module.css';
import buttonStyles from '../styles/buttons.module.css';

export class Incomes extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(hideUpdateForm());
    dispatch(hideIncomeForm());
    dispatch(getIncomes());
  }

  toggleUpdate(id) {
    const { dispatch } = this.props;
    return dispatch(getIncome(id))
      .then(() => dispatch(hideIncomeForm()))
      .then(() => dispatch(showUpdateForm()));
  }

  addIncome() {
    const { dispatch } = this.props;
    dispatch(hideUpdateForm());
    dispatch(showIncomeForm());
  }

  render() {
    const { incomes, addIncome, editIncome, hideIncome } = this.props;
    let incomeResults, incomesSorted, formDisplay;
    if (incomes) {
      incomesSorted = incomes.sort((a, b) => {
        if (a.source.toLowerCase() < b.source.toLowerCase()) return -1;
        if (a.source.toLowerCase() > b.source.toLowerCase()) return 1;
        return 0;
      });
      incomeResults = incomesSorted.map((income, index) => {
        return (
          <React.Fragment key={index}>
            <IncomeCard toggle={this.toggleUpdate} key={index} {...income} />
            <hr />
          </React.Fragment>
        );
      });
    }

    if (addIncome && !editIncome) {
      formDisplay = <IncomeForm />;
    } else if (!addIncome && editIncome) {
      formDisplay = <UpdateIncome />;
    } else {
      formDisplay = '';
    }

    return (
      <section className={styles.incomePage}>
        <div className={styles.incomeAllContent}>
          <div className={styles.incomeHeader}>
            <div className={styles.incomeHeaderButtons}>
              <button className={buttonStyles.settingsAdd} onClick={() => this.addIncome()}>
                <img src={require('../../assets/add.svg')} alt="add income icon" />
              </button>
              <button className={buttonStyles.back} onClick={() => hideIncome()}>
                Back
              </button>
            </div>

            <h3>Incomes</h3>
          </div>

          {formDisplay}
          <hr />
          <ul className={styles.incomeUl}>{incomeResults}</ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  incomes: state.incomes.incomes,
  addIncome: state.incomes.toggleForm,
  editIncome: state.incomes.toggleUpdateForm
});

export default requiresLogin()(connect(mapStateToProps)(Incomes));
