import { render, screen } from '@testing-library/react';
import DeleteModal from './DeleteModal';

const props = {
  showModal: true,
  handleCloseModal: jest.fn(),
  nickname: 'Cliffy',
  confirmDeleteRobot: jest.fn(),
  showDeleteSpinner: false,
};

describe('test suite for DeleteModal', () => {
  test('renders DeleteModal without error', () => {
    const { container } = render(<DeleteModal {...props} />);
    expect(container).toBeTruthy();
    const sadRobot = screen.getByText(`${props.nickname} will be sad 😿`);
    const noDeleteSpinner = screen.getByText('Go for it');
    expect(sadRobot).toBeInTheDocument();
    expect(noDeleteSpinner).toBeInTheDocument();
  });

  test('renders showDeleteSpinner if available', () => {
    const updatedProps = {
      ...props,
      showDeleteSpinner: true,
    };
    render(<DeleteModal {...updatedProps} />);
    const noDeleteSpinner = screen.queryByText('Go for it');
    expect(noDeleteSpinner).not.toBeInTheDocument();
  });
});
