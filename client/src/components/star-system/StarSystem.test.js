import StarSystem, { calcBodyHorizontalStep, calcClickableBodyHeight } from './StarSystem';
import React from 'react';
import { shallow } from 'enzyme';

describe('<StarSystem />', () => {
  it('matches snapshot', () => {
    expect(shallow(<StarSystem />)).toMatchSnapshot();
  });
  it('calculates horizontal step', () => {
    expect(calcBodyHorizontalStep(860, 7)).toEqual(60);
  });
  it('calculates height of body images', () => {
    expect(Math.round(calcClickableBodyHeight(5, 2, 10))).toEqual(208);
  })
  it('calculates min height of body images', () => {
    expect(calcClickableBodyHeight(2, 2, 10)).toEqual(60);
  })
  it('calculates max height of body images', () => {
    expect(calcClickableBodyHeight(10, 2, 10)).toEqual(250);
  })
})