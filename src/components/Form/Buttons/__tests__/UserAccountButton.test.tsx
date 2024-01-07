import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { UserAccountButton } from '../UserAccountButton';

describe('Tests for UserAccountButton', () => {
  const theme = createTheme({
    palette: {
      custom: {
        main: '#00000',
      },
    },
  });

  it('Should render UserAccountButton with activate type', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton type="activate" label="Hello world" />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', {
      name: 'Hello world',
    });
    expect(button).toHaveClass('UserAccountButton-activateButton-2');
  });
  it('Should render UserAccountButton with deactivate type', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton type="deactivate" label="Hello world" />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', {
      name: 'Hello world',
    });
    expect(button).toHaveClass('UserAccountButton-deactivateButton-8');
  });
  it('Should render UserAccountButton with create type', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton type="create" label="Hello world" />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', {
      name: 'Hello world',
    });

    expect(button).toHaveClass('UserAccountButton-createButton-11');
  });
  it('Should handle onClick', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton
          type="activate"
          label="Hello world"
          onClick={handleClick}
        />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', {
      name: 'Hello world',
    });
    userEvent.click(button);
    expect(handleClick).toBeCalled();
  });

  it('Should not be active when disabled.', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton type="activate" label="Hello world" disabled />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', {
      name: 'Hello world',
    });
    expect(button).toBeDisabled();
  });

  it('Should render label in the button', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserAccountButton type="activate" label="Hello world" />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', {
      name: 'Hello world',
    });
    expect(button).toHaveTextContent('Hello world');
  });
});
