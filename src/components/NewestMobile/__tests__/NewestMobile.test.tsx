import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'models/store';

import { mockMobileContent } from './mockMobileContent';
import { NewestMobile } from '../NewestMobile';

store.getState = () => mockMobileContent;

const history = createMemoryHistory();

describe('NewestContainer component renders correctly', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewestMobile />
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

describe('Component renders with correct default view', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewestMobile />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('There are four clickable names of the parts of the Newest section on the Main Page', () => {
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('User is redirected to the "Думки експертів" part by default', () => {
    expect(screen.getByText('ТЕСТ publish')).toBeInTheDocument();
  });

  it('Only one part of the Newest section is demonstrated at once', () => {
    expect(screen.getAllByText('Думка експерта')).toHaveLength(3);
    expect(screen.queryByText('ТЕСТТЕСТТЕСТТЕСТТЕСТ')).toBeNull();
  });
});

describe('User can change the demonstrated part', () => {
  beforeEach(() => {
    const mockVisualViewport = {
      pageTop: 585,
    };

    Object.defineProperty(window, 'visualViewport', {
      writable: true,
      configurable: true,
      value: mockVisualViewport,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewestMobile />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('User can choose the demonstrated part by clicking on the translation tab', () => {
    const translationTab = screen.getByTestId('full-width-tab-1');
    fireEvent.click(translationTab);
    expect(translationTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Єва Євенко')).toBeInTheDocument();
    expect(screen.getByTestId('full-width-tab-0')).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('User can choose the demonstrated part by clicking on the media tab', () => {
    const mediaTab = screen.getByTestId('full-width-tab-2');
    fireEvent.click(mediaTab);
    expect(mediaTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('ТЕСТТЕСТТЕСТТЕСТТЕСТ')).toBeInTheDocument();
    expect(screen.getByTestId('full-width-tab-0')).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('User can choose the demonstrated part by clicking on the video tab', () => {
    const videoTab = screen.getByTestId('full-width-tab-3');
    fireEvent.click(videoTab);
    expect(videoTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByText('erertewrtwertwertwertwertwertwertwertwertwert'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('full-width-tab-0')).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });
});

describe("Material page should be opened by clicking on the material title or material card's text", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewestMobile />
        </Router>
      </Provider>,
    );
  });

  it("clicking on materials card redirects on it's page", () => {
    const links = screen.getAllByText('Думка експерта');
    const link = links[0].closest('a');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/posts/117');
  });
});

describe("By clicking on button 'See all' should be redirected to page with all materials", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewestMobile />
        </Router>
      </Provider>,
    );
  });

  it("clicking on 'Всі думки експертів' redirects to page with all materials of this type", () => {
    const link = screen.getByText('Всі думки експертів').closest('button');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?origins=1');
  });

  it("clicking on 'Всі переклади' redirects to page with all materials of this type", () => {
    fireEvent.click(screen.getByTestId('full-width-tab-1'));
    const link = screen.getByText('Всі переклади').closest('button');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?origins=3');
  });

  it("clicking on 'Всі медитеки' redirects to page with all materials of this type", () => {
    fireEvent.click(screen.getByTestId('full-width-tab-2'));
    const link = screen.getByText('Всі медитеки').closest('button');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?origins=2');
  });

  it("clicking on 'Всі відео' redirects to page with all materials of this type", () => {
    fireEvent.click(screen.getByTestId('full-width-tab-3'));
    const link = screen.getByText('Всі відео').closest('button');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?origins=0&types=2');
  });
});
