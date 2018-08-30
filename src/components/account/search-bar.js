import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';

import { searchAccounts } from '../../actions/accounts';

import Input from '../input';

class SearchForm extends React.Component {
  onSubmit(values) {
    let searchTerm = values.search;
    return this.props.dispatch(searchAccounts(searchTerm));
  }

  render() {
    const { handleSubmit, currentSearchTerm, dispatch, pristine, submitting } = this.props;
    let clearButton;
    if (currentSearchTerm !== '') {
      clearButton = <button onClick={() => dispatch(searchAccounts(''))}>" {currentSearchTerm} " X</button>;
    }

    return (
      <section>
        <form id="search" role="search" onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor="search" />
          <Field component={Input} type="text" name="search" placeholder="search accounts" />
          <button type="submit" disabled={pristine || submitting}>
            search
          </button>
        </form>
        {clearButton}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentSearchTerm: state.accounts.searchTerm
});

const searchForm = connect(mapStateToProps)(SearchForm);

export default reduxForm({
  form: 'search',
  onSubmitFail: (errors, dispatch) => dispatch(focus('search', Object.keys(errors)[0]))
})(searchForm);
