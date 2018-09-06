import React from 'react';
import { EditInfoForm } from '../../../components/profile/edit-info-form';
import { shallow } from 'enzyme';

describe('<EditInfoForm />', () => {
  it('Should render without crashing', () => {
    const initialValues = { firstName: 'John' };
    const initialize = jest.fn();
    shallow(<EditInfoForm initialize={initialize} initialValues={initialValues} handleSubmit={() => {}} />);
  });
});
