
import React from 'react';
import { shallow} from 'enzyme';
import AccountDetails from '../../../components/account/account-details';

  describe('<AccountsDetails />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AccountDetails accounts={accounts} dispatch={dispatch}/>)
    });
  });