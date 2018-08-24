import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { toggleFilter } from '../actions/accounts';


class Filters extends React.Component {
  onChange(event) {
    this.props.dispatch(toggleFilter(event.target.value));
  }

  render() {

    return (
      <div>
        <form
          id="filter"
          className="filter"
        >
          <div className="search-inputs">
          <label htmlFor="filters"></label>
            <Field name="filters" component="select" onChange={this.onChange.bind(this)}>
              <option value="abc">abc</option>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </Field>
          </div>
        </form>
      </div>
    );
  }
}


const filters = connect()(Filters);

export default reduxForm({
  form: 'filters',
  onSubmitFail: (errors, dispatch) => dispatch(focus('filters', Object.keys(errors)[0]))
})(filters);
