import React from 'react';
import { IncomeCard } from '../../../components/income/income-card';
import { shallow } from 'enzyme';

describe('<IncomeCard />', () => {
  it('Should render without crashing', () => {
    const dispatch = jest.fn();
    shallow(<IncomeCard dispatch={dispatch} />);
  });
});
