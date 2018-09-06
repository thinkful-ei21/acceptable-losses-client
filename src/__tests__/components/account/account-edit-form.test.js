
import React from 'react';
import { shallow} from 'enzyme';
import AccountEdit from '../../../components/account/account-edit-form';

  describe('< AccountEdit />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AccountEdit accounts={accounts} dispatch={dispatch}/>)
    });
  });