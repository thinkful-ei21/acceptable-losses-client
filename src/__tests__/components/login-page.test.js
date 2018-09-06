import React from 'react';
import { LoginPage } from '../../components/login-page';
import { shallow } from 'enzyme';

describe('<LoginPage />', () => {
  it('Should render without crashing', () => {
    shallow(<LoginPage />);
  });
});
