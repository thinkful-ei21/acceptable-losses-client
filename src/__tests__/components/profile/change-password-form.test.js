import React from 'react';
import { ChangePasswordForm } from '../../../components/profile/change-password-form';
import { shallow } from 'enzyme';

describe('<ChangePasswordForm />', () => {
  it('Should render without crashing', () => {
    shallow(<ChangePasswordForm handleSubmit={() => {}} />);
  });
});
