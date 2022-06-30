import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import PostInfo, { IPostInfo } from '../PostInfo';

describe('PostInfo tests', () => {
  let mocks: IPostInfo;

  const renderComponentWithRouter = () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <PostInfo info={mocks.info} />
      </Router>,
    );

    return { history };
  };

  beforeEach(() => {
    mocks = {
      info: {
        directions: [
          {
            id: 7,
            name: 'pediatrics',
            label: 'Педіатрія',
            color: '#993333',
            hasDoctors: true,
            hasPosts: true,
          },
          {
            id: 4,
            name: 'therapy',
            label: 'Терапія',
            color: '#ffee58',
            hasDoctors: true,
            hasPosts: true,
          },
        ],
        origins: [
          {
            id: 2,
            name: 'Медитека',
            parameter: null,
          },
        ],
        type: {
          id: 1,
          name: 'Стаття',
        },
        publishedAt: '05.10.2021',
        displayViews: 9,
      },
    };
  });

  it('should PostInfo render correctly', () => {
    const { asFragment } = render(<PostInfo info={mocks.info} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should main blocks be in the component', () => {
    render(<PostInfo info={mocks.info} />);

    expect(screen.getByTestId('topics')).toBeInTheDocument();
    expect(screen.getByTestId('origins')).toBeInTheDocument();
  });

  it('should onClick handler redirect to directions', () => {
    const { history } = renderComponentWithRouter();

    const items = screen.getAllByTestId('direction');
    expect(items[0]).toBeInTheDocument();

    userEvent.click(items[0]);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?directions=7');
  });

  it('should onClick handler redirect to origins', () => {
    const { history } = renderComponentWithRouter();

    const items = screen.getAllByTestId('origin');
    expect(items[0]).toBeInTheDocument();

    userEvent.click(items[0]);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?origins=2');
  });

  it('should onClick handler redirect to types', () => {
    const { history } = renderComponentWithRouter();

    const items = screen.getAllByTestId('type');
    expect(items[0]).toBeInTheDocument();

    userEvent.click(items[0]);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/materials');
    expect(history.location.search).toBe('?types=1');
  });

  it('should mobile be with Views Counter', () => {
    const { asFragment } = render(
      <ScreenContext.Provider value={{ mobile: true, tablet: null }}>
        <PostInfo info={mocks.info} />
      </ScreenContext.Provider>,
    );

    expect(screen.queryByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByTestId('counter')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should Skeleton be visible', () => {
    delete mocks.info.displayViews;

    const { asFragment } = render(<PostInfo info={mocks.info} />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
