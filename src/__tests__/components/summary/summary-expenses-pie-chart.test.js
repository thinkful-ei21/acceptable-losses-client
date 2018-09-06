import React from 'react';
import PieChartExpenses from '../../../components/summary/summary-expenses-pie-chart';
import { shallow } from 'enzyme';

describe('<PieChartExpenses />', () => {
  it('Should render without crashing', () => {
    shallow(<PieChartExpenses />);
  });
});
