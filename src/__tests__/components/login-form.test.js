import React from 'react';
import { LoginForm } from '../../components/login-form';
import { shallow } from 'enzyme';

describe('<LoginForm />', () => {
  it('Should render without crashing', () => {
    shallow(<LoginForm handleSubmit={() => {}} />);
  });
});
