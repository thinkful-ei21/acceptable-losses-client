import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { createIncome, getIncomes, hideIncomeForm } from '../../actions/incomes';
import { required, nonEmpty } from '../../validators';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';

import Input from '../input';

export class IncomeForm extends React.Component {
  onSubmit(values) {
    const { dispatch, history } = this.props;
    return dispatch(createIncome(values))
      .then(() => dispatch(getIncomes()))
      .then(() => history.push(`/dashboard`));
  }
  cancelAdd() {
    this.props.dispatch(hideIncomeForm());
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        {err}
        <label htmlFor="source" className={styles.inputLabel}>
          Source
        </label>
        <Field
          styleClass={styles.formInput}
          component={Input}
          type="text"
          name="source"
          id="source"
          validate={[required, nonEmpty]}
          placeholder="Source"
        />

        <label htmlFor="amount" className={styles.inputLabel}>
          Amount
        </label>
        <Field
          styleClass={styles.formInput}
          component={Input}
          type="amount"
          name="amount"
          id="amount"
          validate={required}
          placeholder="Amount"
        />

        <div className={styles.settingsFormButtons}>
          <button className={buttonStyles.form} type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button className={buttonStyles.form} onClick={() => this.cancelAdd()}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  toggleUpdateForm: state.incomes.toggleUpdateForm
});

const incomeForm = connect(mapStateToProps)(IncomeForm);

export default reduxForm({
  form: 'income',
  onSubmitFail: (errors, dispatch) => dispatch(focus('income', 'source'))
})(incomeForm);
