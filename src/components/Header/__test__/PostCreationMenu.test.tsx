import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostCreationMenu } from '../PostCreationMenu';

const openMenu = () => {
  const menuButton = screen.getByText(/Створити/i);
  fireEvent.click(menuButton);
};

describe('PostCreationMenu tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PostCreationMenu />
      </MemoryRouter>,
    );
  });
  it('should render PostCreationMenu component', () => {
    expect(screen.getByText(/Створити/i)).toBeInTheDocument();
  });
  it('should render dropdown menu by click', () => {
    openMenu();
    expect(screen.getByText(/статтю/i)).toBeVisible();
  });
  it('should hide dropdown menu by click', () => {
    openMenu();
    const menuItem = screen.getByText(/статтю/i);
    fireEvent.click(menuItem);
    expect(menuItem).not.toBeVisible();
  });
});
