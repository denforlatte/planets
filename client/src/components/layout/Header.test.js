import Header from './header';
import React from 'react';
import { shallow } from 'enzyme';

describe('<Header />', () => {
  it('matches snapshot', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });
});