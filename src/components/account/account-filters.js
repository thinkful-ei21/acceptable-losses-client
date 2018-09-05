import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';

import { toggleFilter } from '../../actions/accounts';

import styles from '../styles/forms.module.css';

class Filters extends React.Component {
  onChange(event) {
    this.props.dispatch(toggleFilter(event.target.value));
  }

  render() {
    return (
      <form id="filter" className={styles.filterForm}>
        <label htmlFor="filters">Filter</label>
        <Field name="filters"
          component="select"
          onChange={this.onChange.bind(this)}
          className={styles.filterDropDown}
        >
          <option hidden>Filter by</option>
          <option value="abc">A-Z</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="pastDue">Past Due</option>
        </Field>
      </form>
    );
  }
}

const filters = connect()(Filters);

export default reduxForm({
  form: 'filters',
  onSubmitFail: (errors, dispatch) => dispatch(focus('filters', Object.keys(errors)[0]))
})(filters);
