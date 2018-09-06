import React from 'react';
import BarGraphExpenses from '../../../components/summary/summary-expenses-bar-graph';
import { shallow } from 'enzyme';

describe('<BarGraphExpenses />', () => {
  it('Should render without crashing', () => {
    shallow(<BarGraphExpenses />);
  });
});
