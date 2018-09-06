import React from 'react';
import { shallow} from 'enzyme';
import {Calendar} from '../../../components/calendar/calendar';

  describe('< Calendar />', () => {
    it('Renders without crashing', () => {
    const accounts=[]
    const dispatch= jest.fn()
      shallow(<Calendar accounts={accounts} dispatch={dispatch}/>)
    });
  }); 