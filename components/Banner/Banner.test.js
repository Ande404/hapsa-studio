import React from 'react';
import { render, screen } from '../../test-utils';
import { Banner } from './Banner';

describe('Banner', () => {
  it('should render empty abnner', () => {
    render(<Banner />);

    expect(screen.getByTestId('banner')).toBeTruthy();
  });
});
