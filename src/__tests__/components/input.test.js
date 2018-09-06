import React from 'react';
import Input from '../../components/input';
import { shallow } from 'enzyme';

describe('<Input />', () => {
  it('Should render without crashing', () => {
    const meta = { touched: true, error: false };
    const input = { name: '' };
    shallow(<Input meta={meta} input={input} />);
  });
});
