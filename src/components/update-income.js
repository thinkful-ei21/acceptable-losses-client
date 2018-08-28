import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { updateIncome } from '../actions/incomes';
import { required, nonEmpty } from '../validators';

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
    const { error, handleSubmit, submitting } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor="source">Source</label>
        <Field component={Input} type="text" name="source" id="source" validate={[required, nonEmpty]} />
        <label htmlFor="amount">Amount</label>
        <Field component={Input} type="amount" name="amount" id="amount" validate={required} />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        {err}
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
