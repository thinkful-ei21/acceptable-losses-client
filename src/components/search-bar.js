import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import Input from './input';
import { searchAccounts } from '../actions/accounts';

class SearchForm extends React.Component {
  onSubmit(values) {
    let searchTerm = values.search;
    return this.props.dispatch(searchAccounts(searchTerm));
    // .then(()=>this.props.dispatch(reset('search')));
  }

  render() {
    let clearButton;
    if (this.props.currentSearchTerm !== '') {
      clearButton = (
        <button onClick={e => this.props.dispatch(searchAccounts(''))}>
          '{this.props.currentSearchTerm}
          '|X
        </button>
      );
    }

    return (
      <div>
        <form
          id="search"
          role="search"
          className="search"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="search-inputs">
            <label htmlFor="search" />
            <Field className="search-box" component={Input} type="text" name="search" placeholder="search accounts" />
            <button type="submit" className="search-button" disabled={this.props.pristine || this.props.submitting}>
              search
            </button>
          </div>
        </form>
        {clearButton}
      </div>
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
