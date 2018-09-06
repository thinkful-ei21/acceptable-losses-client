import React from 'react';
import { RegistrationPage } from '../../components/registration-page';
import { shallow } from 'enzyme';

describe('<RegistrationPage />', () => {
  it('Should render without crashing', () => {
    shallow(<RegistrationPage />);
  });
});
