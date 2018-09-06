import React from 'react';
import { IncomeForm } from '../../../components/income/income-form';
import { shallow } from 'enzyme';

describe('<IncomeForm />', () => {
  it('Should render without crashing', () => {
    shallow(<IncomeForm handleSubmit={() => {}} />);
  });
});
