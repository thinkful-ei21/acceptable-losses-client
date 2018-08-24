import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { updateIncome } from '../actions/incomes';
import { required, nonEmpty } from '../validators';

export class UpdateIncomeForm extends React.Component {
  onSubmit(values) {
    const id = this.props.income.id;
    console.log(id);
    this.props.dispatch(updateIncome(values, id));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form className="income-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {error}
        <label htmlFor="source">Source</label>
        <Field
          className="source-input"
          component={Input}
          type="text"
          name="source"
          id="source"
          validate={[required, nonEmpty]}
        />
        <label htmlFor="amount">Amount</label>
        <Field
          className="amount-input"
          component={Input}
          type="amount"
          name="amount"
          id="amount"
          validate={[required, nonEmpty]}
        />
        <button className="income-button" disabled={this.props.pristine || this.props.submitting}>
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  income: state.incomes.income
});

const updateIncomeForm = connect(mapStateToProps)(UpdateIncomeForm);

export default reduxForm({
  form: 'income',
  onSubmitFail: (errors, dispatch) => dispatch(focus('income', 'source'))
})(updateIncomeForm);
