import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { updateIncome } from '../../actions/incomes';
import { required, nonEmpty } from '../../validators';

import Input from '../input';

export class UpdateIncomeForm extends React.Component {
  componentDidMount() {
    const { source, amount } = this.props.initialValues;
    this.props.initialize({ source, amount });
  }

  onSubmit(values) {
    const { id } = this.props.initialValues;
    this.props.dispatch(updateIncome(values, id));
  }

  render() {
    let error;
    if (this.props.error) {
      error = <div aria-live="polite">{this.props.error}</div>;
    }
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {error}
        <label htmlFor="source">Source</label>
        <Field component={Input} type="text" name="source" id="source" validate={[required, nonEmpty]} />
        <label htmlFor="amount">Amount</label>
        <Field component={Input} type="amount" name="amount" id="amount" validate={[required, nonEmpty]} />
        <button type="submit" disabled={this.props.submitting}>
          Submit
        </button>
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
