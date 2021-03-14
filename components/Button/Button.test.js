import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Primary Button', () => {
  it('Render primary button', () => {
    render(<Button>Primary Button</Button>);
    expect(screen.getByTestId('button')).toBeTruthy();
  });
});
