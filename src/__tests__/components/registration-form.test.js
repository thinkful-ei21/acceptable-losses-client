import React from 'react';
import { RegistrationForm } from '../../components/registration-form';
import { shallow } from 'enzyme';

describe('<RegistrationForm />', () => {
  it('Should render without crashing', () => {
    shallow(<RegistrationForm handleSubmit={() => {}} />);
  });
});
