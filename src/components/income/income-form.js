import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { createIncome, getIncomes, hideIncomeForm } from '../../actions/incomes';
import { required, nonEmpty } from '../../validators';

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
        <label htmlFor="source">Source</label>
        <Field component={Input}
          type="text"
          name="source"
          id="source"
          validate={[required, nonEmpty]}
        />

        <label htmlFor="amount">Amount</label>
        <Field component={Input}
          type="amount"
          name="amount"
          id="amount"
          validate={required}
        />

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button onClick={() => this.cancelAdd()}>Cancel</button>
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
