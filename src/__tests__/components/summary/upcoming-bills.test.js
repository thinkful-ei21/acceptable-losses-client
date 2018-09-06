import React from 'react';
import { UpcomingBills } from '../../../components/summary/upcoming-bills';
import { shallow } from 'enzyme';

describe('<UpcomingBills />', () => {
  it('Should render without crashing', () => {
    shallow(<UpcomingBills />);
  });
});
