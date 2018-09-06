
import React from 'react';
import { shallow} from 'enzyme';
import AccountPay from '../../../components/account/account-pay-form';

  describe('< AccountPay />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AccountPay accounts={accounts} dispatch={dispatch}/>)
    });
  });