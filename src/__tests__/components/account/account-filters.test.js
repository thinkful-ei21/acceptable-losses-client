
import React from 'react';
import { shallow} from 'enzyme';
import Filters from '../../../components/account/account-filters';

  describe('< Filters />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<Filters accounts={accounts} dispatch={dispatch}/>)
    });
  });