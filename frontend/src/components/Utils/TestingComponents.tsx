import React, { ReactComponentElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderWithHistory = (component: React.ReactElement) => {
  return render(<Router>{component}</Router>);
};
