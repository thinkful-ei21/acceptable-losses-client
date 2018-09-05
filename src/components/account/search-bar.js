import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';

import { searchAccounts } from '../../actions/accounts';

import Input from '../input';

import styles from '../styles/forms.module.css';


class SearchForm extends React.Component {
  onSubmit(values) {
    let searchTerm = values.searchBox;
    return this.props.dispatch(searchAccounts(searchTerm));
  }
  onChange(){            
    if(this.props.pristine){
    this.props.dispatch(searchAccounts(''))
    }
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
        <form id="search"
          role="search"
          onSubmit={handleSubmit(values => this.onSubmit(values))}
          className={styles.searchForm}
        >
          <label htmlFor="search">Search</label>
          <Field component={Input}
            type="text"
            name="searchBox"
            placeholder="Search"
            styleClass={styles.searchInput}
            onChange={this.onChange()}
            value=''
          />
          <button type="submit" disabled={pristine || submitting }>
            <img src={require('../../assets/search.svg')} alt="search icon"/>
          </button>
        </form>
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
