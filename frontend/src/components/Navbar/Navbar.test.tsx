import { screen } from '@testing-library/react';
import { renderWithHistory } from '../Utils/TestingComponents';
import Navbar from './Navbar';

describe('test suite for Navbar', () => {
  test('renders Navbar without error', () => {
    const { container } = renderWithHistory(<Navbar />);

    expect(container).toBeTruthy();

    const navbarText1 = screen.getByText('🤖');
    const navbarText2 = screen.getByText('Robots');
    expect(navbarText1).toBeInTheDocument();
    expect(navbarText2).toBeInTheDocument();
  });
});
