import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostBreadcrumbs, IProps } from '../PostBreadcrumbs';
import { useBreadcurmbs } from '../Basic/BreadcrumbsProvider';

jest.mock('../Basic/BreadcrumbsProvider', () => ({
  useBreadcurmbs: jest.fn(),
}));

describe('PostBreadcrumbs tests', () => {
  let component: RenderResult;

  const postBreadcrumbsMocks: IProps = {
    origins: [{ id: 2, name: 'Медитека', parameter: null }],
    type: { id: 1, name: 'Стаття' },
    expert: { id: 1, expertName: 'Єва Євенко' },
    materialTitle: 'Як підготуватися до вакцинації',
  };

  function renderComponent() {
    component = render(
      <MemoryRouter>
        <PostBreadcrumbs
          origins={postBreadcrumbsMocks.origins}
          type={postBreadcrumbsMocks.type}
          expert={postBreadcrumbsMocks.expert}
          materialTitle={postBreadcrumbsMocks.materialTitle}
        />
      </MemoryRouter>,
    );
  }

  it('should PostBreadcrumbs render', () => {
    renderComponent();
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });

  it('should materials breadcrumbs be visible', () => {
    (useBreadcurmbs as jest.Mock).mockImplementation(() => 'materials');

    renderComponent();

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
    (useBreadcurmbs as jest.Mock).mockImplementation(() => 'materialsExpert');

    renderComponent();

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
    (useBreadcurmbs as jest.Mock).mockImplementation(() => 'experts');

    renderComponent();

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
    (useBreadcurmbs as jest.Mock).mockImplementation(() => 'expert');

    renderComponent();

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
