import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BurgerMenu } from './BurgerMenu';
import { navElements } from '../Header/navElements';

describe('Burger menu test', () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <BurgerMenu
        navigation={navElements}
        mobileMenuOpen
        setMobileMenuOpen={jest.fn}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should invoke function on click', () => {
    const clickHandlerMock = jest.fn();
    render(
      <BurgerMenu
        navigation={navElements}
        mobileMenuOpen
        setMobileMenuOpen={clickHandlerMock}
      />,
    );
    const menuButton = screen.getByTestId('menuButton');
    userEvent.click(menuButton);
    expect(clickHandlerMock).toHaveBeenCalled();
  });
});
