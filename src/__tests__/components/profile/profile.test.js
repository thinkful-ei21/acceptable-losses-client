import React from 'react';
import { Profile } from '../../../components/profile/profile';
import { shallow } from 'enzyme';

describe('<Profile />', () => {
  it('Should render without crashing', () => {
    const user = { profilePic: { public_id: '' }, firstName: 'John' };
    const dispatch = jest.fn();
    shallow(<Profile user={user} dispatch={dispatch} />);
  });
});
