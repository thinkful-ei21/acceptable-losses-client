
import React from 'react';
import { shallow} from 'enzyme';
import AccountsCard from '../../../components/account/account-card';

  describe('<AccountsCard />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AccountsCard accounts={accounts} dispatch={dispatch}/>)
    });
  });