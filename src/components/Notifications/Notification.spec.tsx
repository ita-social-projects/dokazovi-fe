import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Notification } from './Notification';

const notification = 'some notification';
const history = createMemoryHistory();

describe('Test for Notification.tsx', () => {
  it('should render properly', () => {
    render(<Notification message={notification} />);
    expect(screen.getByText(notification)).toBeInTheDocument();
  });

  it('should redirect properly', () => {
    history.push('/notification');
    render(
      <Router history={history}>
        <Notification message={notification} />
      </Router>,
    );
    const button = screen.getByTestId('button');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });
});
