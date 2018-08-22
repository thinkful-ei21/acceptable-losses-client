import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
import {searchAccounts} from '../actions/accounts';

class SearchForm extends React.Component {

  onSubmit(values){
    let searchTerm =values.search;
    if (!searchTerm){
      searchTerm= ''
    }
    this.props.dispatch(searchAccounts(searchTerm));
    
  }

    render() {
      return (
        <form 
            role="search"
            className="search" 
            onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values))}>
          <div className="search-inputs">
          <label htmlFor="search"></label>
          <Field className="search-box"component={Input} type="text" name="search" placeholder="search accounts"/>
          <button type="submit" className="search-button">search</button>
          </div>
        </form>
      );
    }
}

SearchForm = reduxForm({
    form: 'search',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('search', Object.keys(errors)[0]))
})(SearchForm);


export default (connect()(SearchForm));