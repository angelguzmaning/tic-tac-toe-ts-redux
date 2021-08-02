import { render } from '@testing-library/react';
import { Square } from './Square';

test('renders learn react link', () => {
  const { getByText } = render(<Square value='X' onClick={() => {}}></Square>);

  expect(getByText('X')).toBeInTheDocument();
});
