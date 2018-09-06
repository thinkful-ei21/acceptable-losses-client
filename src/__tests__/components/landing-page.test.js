import React from 'react';
import LandingPage from '../../components/landing-page';
import { shallow } from 'enzyme';

describe('<LandingPage />', () => {
  it('Should render without crashing', () => {
    shallow(<LandingPage />);
  });
});
