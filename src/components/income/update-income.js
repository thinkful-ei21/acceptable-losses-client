import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { updateIncome, hideUpdateForm } from '../../actions/incomes';
import { required, nonEmpty } from '../../validators';

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

  // cancelUpdate() {
  //   const { dispatch } = this.props;
  //   dispatch(hideUpdateForm());
  // }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    let err;
    if (error) {
      err = <div aria-live="polite">{error}</div>;
    }
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        {err}
        <label htmlFor="source">Source</label>
        <Field component={Input} type="text" name="source" id="source" validate={[required, nonEmpty]} />
        <label htmlFor="amount">Amount</label>
        <Field component={Input} type="amount" name="amount" id="amount" validate={required} />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button onClick={() => dispatch(hideUpdateForm())}>X</button>
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
