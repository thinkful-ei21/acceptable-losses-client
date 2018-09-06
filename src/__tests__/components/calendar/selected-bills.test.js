import React from 'react';
import { shallow} from 'enzyme';
import {SelectedBills} from '../../../components/calendar/selected-bills';

  describe('< SelectedBills />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<SelectedBills accounts={accounts} dispatch={dispatch}/>)
    });
  });