import React from 'react';
import { HeaderBar } from '../../components/header';
import { shallow } from 'enzyme';

describe('<HeaderBar />', () => {
  it('Should render without crashing', () => {
    shallow(<HeaderBar />);
  });
});
