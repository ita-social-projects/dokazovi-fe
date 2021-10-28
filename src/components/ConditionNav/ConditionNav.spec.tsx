import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from 'models/store';
import ConditionNav from './ConditionNav';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ConditionNav />
      </MemoryRouter>
    </Provider>,
  );

const renderComponentWithHistory = () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <ConditionNav />
      </Router>
    </Provider>,
  );

  return { history };
};

const hasClassContaining = (classes: string[], str: string) => {
  const classContainingStr = classes.find((el) => el.includes(str));
  return !!classContainingStr;
};

describe('ConditionsNav', () => {
  beforeEach(() => renderComponent());

  it('should render correctly and match the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionNav />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should has "about" link', () => {
    expect(screen.getByText('Про платформу')).toBeInTheDocument();
  });

  it('should has "rules" link', () => {
    expect(screen.getByText('Правила використання')).toBeInTheDocument();
  });

  it('should has "contacts" link', () => {
    expect(screen.getByText('Контакти')).toBeInTheDocument();
  });
});

describe('ConditionsNav Events', () => {
  it('should change query #fragment by click on a link', () => {
    const { history } = renderComponentWithHistory();

    const aboutLink = screen.getByTestId('about');
    const rulesLink = screen.getByTestId('rules');
    const contactsLink = screen.getByTestId('contacts');

    userEvent.click(aboutLink);
    expect(history.location.hash).toBe('#about');

    userEvent.click(rulesLink);
    expect(history.location.hash).toBe('#rules');

    userEvent.click(contactsLink);
    expect(history.location.hash).toBe('#contacts');
  });

  it('should toggle "linkSelected" class on an active link', () => {
    renderComponent();

    const aboutLink = screen.getByTestId('about');
    const rulesLink = screen.getByTestId('rules');
    const contactsLink = screen.getByTestId('contacts');

    userEvent.click(aboutLink);
    expect(hasClassContaining(Array.from(aboutLink.classList), 'linkSelected'));
    expect(
      hasClassContaining(Array.from(rulesLink.classList), 'linkSelected'),
    ).toBeFalsy();
    expect(
      hasClassContaining(Array.from(contactsLink.classList), 'linkSelected'),
    ).toBeFalsy();

    userEvent.click(rulesLink);
    expect(hasClassContaining(Array.from(rulesLink.classList), 'linkSelected'));
    expect(
      hasClassContaining(Array.from(aboutLink.classList), 'linkSelected'),
    ).toBeFalsy();
    expect(
      hasClassContaining(Array.from(contactsLink.classList), 'linkSelected'),
    ).toBeFalsy();

    userEvent.click(contactsLink);
    expect(
      hasClassContaining(Array.from(contactsLink.classList), 'linkSelected'),
    );
    expect(
      hasClassContaining(Array.from(aboutLink.classList), 'linkSelected'),
    ).toBeFalsy();
    expect(
      hasClassContaining(Array.from(rulesLink.classList), 'linkSelected'),
    ).toBeFalsy();
  });
});
