import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chatr from '../components/Chatr';

test('Check for Getting Started Text', () => {
  const { getByText } = render(<Chatr />);
  expect(getByText('Passed tests huh')).toBeInTheDocument();
});
