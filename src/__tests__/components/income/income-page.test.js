import React from 'react';
import { Incomes } from '../../../components/income/income-page';
import { shallow } from 'enzyme';

describe('<Incomes />', () => {
  it('Should render without crashing', () => {
    const dispatch = jest.fn();
    shallow(<Incomes dispatch={dispatch} />);
  });
});
