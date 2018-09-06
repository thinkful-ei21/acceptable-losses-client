import React from 'react';
import { Dashboard } from '../../components/dashboard';
import { shallow } from 'enzyme';

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    const user = { firstName: 'John' };
    const dispatch = jest.fn();
    shallow(<Dashboard user={user} dispatch={dispatch} />);
  });
});
