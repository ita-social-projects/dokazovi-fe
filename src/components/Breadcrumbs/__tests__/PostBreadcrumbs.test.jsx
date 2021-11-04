/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostBreadcrumbs } from '../PostBreadcrumbs';
import { useBreadcurmbs } from '../Basic/BreadcrumbsProvider';

jest.mock('../Basic/BreadcrumbsProvider', () => ({
  useBreadcurmbs: jest.fn(),
}));

const postBreadcrumbsMocks = {
  origins: [{ id: 2, name: 'Медитека', parameter: null }],
  type: { id: 1, name: 'Стаття' },
  expert: { id: 1, expertName: 'Єва Євенко' },
  materialTitle: 'Як підготуватися до вакцинації',
};

describe('PostBreadcrumbs tests', () => {
  it('should PostBreadcrumbs render', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should materials breadcrumbs be visible', () => {
    useBreadcurmbs.mockImplementation(() => 'materials');

    render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('link')[0]).toHaveAttribute(
      'href',
      '/materials',
    );

    expect(screen.getAllByTestId('link')[1]).toHaveAttribute(
      'href',
      '/materials?origins=2',
    );

    expect(screen.getAllByTestId('link')[2]).toHaveAttribute(
      'href',
      '/materials?types=1',
    );
  });

  it('should materialsExpert breadcrumbs be visible', () => {
    useBreadcurmbs.mockImplementation(() => 'materialsExpert');

    render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('link')[0]).toHaveAttribute(
      'href',
      '/materials',
    );

    expect(screen.getAllByTestId('link')[1]).toHaveAttribute(
      'href',
      '/experts/1',
    );
  });

  it('should experts breadcrumbs be visible', () => {
    useBreadcurmbs.mockImplementation(() => 'experts');

    render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('link')[0]).toHaveAttribute(
      'href',
      '/experts',
    );

    expect(screen.getAllByTestId('link')[1]).toHaveAttribute(
      'href',
      '/experts/1',
    );

    expect(screen.getAllByTestId('link')[2]).toHaveAttribute(
      'href',
      '/materials?types=1',
    );
  });

  it('should expert breadcrumbs be visible', () => {
    useBreadcurmbs.mockImplementation(() => 'expert');

    render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('link')[0]).toHaveAttribute(
      'href',
      '/experts/1',
    );

    expect(screen.getAllByTestId('link')[1]).toHaveAttribute(
      'href',
      '/materials?types=1',
    );
  });
});
