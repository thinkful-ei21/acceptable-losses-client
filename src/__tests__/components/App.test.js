import React from 'react';
import { App } from '../../components/App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('Should render without crashing', () => {
    shallow(<App />);
  });
});
