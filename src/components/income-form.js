import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { createIncome } from '../actions/incomes';
import { required, nonEmpty } from '../validators';

export class IncomeForm extends React.Component {
  onSubmit(values) {
    // console.log('got here 1', this.props.toggleUpdateForm, this.props.updateItem);
    // const { id, source, amount } = this.props.updateItem;
    // let updateVal = values;
    // if (this.props.toggleUpdateForm) {
    //   console.log('got here 2');
    //   if (!values.source) {
    //     console.log('got here 3');
    //     updateVal = { source, amount: values.amount };
    //   } else if (!values.amount) {
    //     console.log('got here 4');
    //     updateVal = { source: values.source, amount };
    //   } else {
    //     console.log('got here 5');
    //     updateVal = values;
    //   }
    //   this.props.dispacth(updateIncome(updateVal, id));
    // }
    this.props.dispatch(createIncome(values));
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
  toggleUpdateForm: state.incomes.toggleUpdateForm
});

const incomeForm = connect(mapStateToProps)(IncomeForm);

export default reduxForm({
  form: 'income',
  onSubmitFail: (errors, dispatch) => dispatch(focus('income', 'source'))
})(incomeForm);
