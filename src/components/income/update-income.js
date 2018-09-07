import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { updateIncome, hideUpdateForm } from '../../actions/incomes';
import { required, nonEmpty } from '../../validators';

import styles from '../styles/forms.module.css';
import buttonStyles from '../styles/buttons.module.css';

import Input from '../input';

export class UpdateIncomeForm extends React.Component {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    const { source, amount } = initialValues;
    initialize({ source, amount });
  }

  onSubmit(values) {
    const { initialValues, dispatch } = this.props;
    const { id } = initialValues;
    dispatch(updateIncome(values, id));
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
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
          <button className={buttonStyles.form} type="submit" disabled={submitting}>
            Submit
          </button>
          <button className={buttonStyles.form} onClick={() => dispatch(hideUpdateForm())}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.incomes.income
});

const updateIncomeForm = connect(mapStateToProps)(UpdateIncomeForm);

export default reduxForm({
  form: 'income',
  onSubmitFail: (errors, dispatch) => dispatch(focus('income', Object.keys(errors)[0]))
})(updateIncomeForm);
