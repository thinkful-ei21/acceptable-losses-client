
import React from 'react';
import { shallow} from 'enzyme';
import SearchForm from '../../../components/account/search-bar';

  describe('< SearchForm />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<SearchForm accounts={accounts} dispatch={dispatch}/>)
    });
  });