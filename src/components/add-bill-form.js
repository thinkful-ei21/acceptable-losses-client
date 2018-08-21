import React from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import {createBill} from '../actions/bills';
import Input from './input';
import {required, nonEmpty} from '../validators';


export class AddBillForm extends React.Component {
    onSubmit(values) {
        // const {name, website, amount, duedate, frequency} = values;
        return this.props.dispatch(createBill(values)) 
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded){
            successMessage= <p>Successfully added!</p>
        }
        return (
            <form
                className="bill-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="name">Name:</label>
                <Field component={Input} type="text" name="name" validate={[required, nonEmpty]} placeholder="Netflix"/>
                <label htmlFor="website">Website:</label>
                <Field component={Input} type="text" name="website"placeholder="Netflix.com/payments"/>
                <label htmlFor="amount">Amount:</label>
                <Field component={Input} type="text" name="amount" validate={[required, nonEmpty]} placeholder="$100"/>
                <label htmlFor="duedate">Due Date:</label>
                <Field component={Input} type="text" name="duedate"placeholder="1/2/2019"/>
                <label htmlFor="frequency">Frequency:</label>
                <Field name="frequency" component="select" validate= {required} required >
                    <option value="One Time">One Time</option>
                    <option value="Monthly">Monthly</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Annual">Annual</option>
                </Field>
                <button
                    className='save-button'
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Save
                </button>
                {successMessage}
            </form>
        );
    }
}

export default reduxForm({
    form: 'bill',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('bill', Object.keys(errors)[0]))
})(AddBillForm);