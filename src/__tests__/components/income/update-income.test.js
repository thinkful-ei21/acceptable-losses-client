import React from 'react';
import { UpdateIncomeForm } from '../../../components/income/update-income';
import { shallow } from 'enzyme';

describe('<UpdateIncomeForm />', () => {
  it('Should render without crashing', () => {
    const initialValues = { source: 'Job' };
    const initialize = jest.fn();
    shallow(<UpdateIncomeForm initialize={initialize} initialValues={initialValues} handleSubmit={() => {}} />);
  });
});
