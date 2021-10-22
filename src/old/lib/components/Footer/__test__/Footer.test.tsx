import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScreenContext } from '../../../../provider/MobileProvider/ScreenContext';
import { Footer } from '../Footer';

describe('Footer component render correctly', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  });
  it("Footer project's logo render correctly", () => {
    expect(screen.getByText('Доказові')).toBeInTheDocument();
  });
  it('Navigation links render on the desktop', () => {
    expect(screen.queryAllByRole('link')).toHaveLength(6);
  });
});

describe('Mobile version renders correctly', () => {
  const screenContextMock = {
    mobile: true,
    tablet: null,
  };
  it('Footer NavLinks do not render on mobile version', () => {
    render(
      <ScreenContext.Provider value={screenContextMock}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ScreenContext.Provider>,
    );
    expect(screen.queryAllByRole('link')).toHaveLength(3);
  });
});
