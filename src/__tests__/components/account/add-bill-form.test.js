
import React from 'react';
import { shallow} from 'enzyme';
import AddBillForm from '../../../components/account/add-bill-form';

  describe('< AddBillForm />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<AddBillForm accounts={accounts} dispatch={dispatch}/>)
    });
  });