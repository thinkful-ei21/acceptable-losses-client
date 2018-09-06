
import React from 'react';
import { shallow} from 'enzyme';
import {AccountsPage} from '../../../components/account/accounts-page';

  describe('<AccountsPage />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AccountsPage accounts={accounts} dispatch={dispatch}/>)
    });
  });
