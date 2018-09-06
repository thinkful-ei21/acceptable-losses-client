import React from 'react';
import { SummaryDisplay } from '../../../components/summary/summary-display';
import { shallow } from 'enzyme';

describe('<SummaryDisplay />', () => {
  it('Should render without crashing', () => {
    const accounts = [];
    const incomes = [];
    const dispatch = jest.fn();
    shallow(<SummaryDisplay accounts={accounts} incomes={incomes} dispatch={dispatch} />);
  });
});
