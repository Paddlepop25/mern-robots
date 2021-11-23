import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('test suite for Footer', () => {
  test('renders Footer without error', () => {
    const { container } = render(<Footer />);
    screen.debug();
    expect(container).toBeTruthy();
    const footerText1 = screen.getByText('Built with ❤️ for 🍦🍦');
    const footerText2 = screen.getByText('Contact Me 👩🏻‍💻');
    expect(footerText1).toBeInTheDocument();
    expect(footerText2).toBeInTheDocument();
  });
});
