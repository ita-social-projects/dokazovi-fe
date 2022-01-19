import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingStatusEnum } from 'old/lib/types';
import MaterialsViewMobile from '../MaterialsViewMobile';

const SelectedTypes = () => {
  return <div>Selected Types</div>;
};
const FilterCheckboxes = () => {
  return <div>FilterCheckboxes</div>;
};
const LoadMoreButton = () => {
  return <button type="button">Load More</button>;
};

const PROPS_MOCK = {
  page: 1,
  header: 'Materials',
  loading: LoadingStatusEnum.succeeded,
  materials: [
    {
      author: {
        firstName: 'Олег',
        lastName: 'Петренко',
      },
    },
  ],
  totalElements: 1,
  resetPage: jest.fn(),
  SelectedTypes: <SelectedTypes />,
  FilterCheckboxes: <FilterCheckboxes />,
  LoadMoreButton: <LoadMoreButton />,
};

describe('MaterialsViewMobile tests', () => {
  it("should render materials list when loading status is 'succeeded'", () => {
    render(
      <MemoryRouter>
        <MaterialsViewMobile
          page={PROPS_MOCK.page}
          header={PROPS_MOCK.header}
          loading={PROPS_MOCK.loading}
          materials={PROPS_MOCK.materials}
          totalElements={PROPS_MOCK.totalElements}
          resetPage={PROPS_MOCK.resetPage}
          SelectedTypes={PROPS_MOCK.SelectedTypes}
          FilterCheckboxes={PROPS_MOCK.FilterCheckboxes}
          LoadMoreButton={PROPS_MOCK.LoadMoreButton}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Олег Петренко/)).toBeInTheDocument();
  });

  it("should not render materials list when the loading status is 'pending'", () => {
    render(
      <MemoryRouter>
        <MaterialsViewMobile
          page={0}
          header={PROPS_MOCK.header}
          loading={LoadingStatusEnum.pending}
          materials={PROPS_MOCK.materials}
          totalElements={PROPS_MOCK.totalElements}
          resetPage={PROPS_MOCK.resetPage}
          SelectedTypes={PROPS_MOCK.SelectedTypes}
          FilterCheckboxes={PROPS_MOCK.FilterCheckboxes}
          LoadMoreButton={PROPS_MOCK.LoadMoreButton}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/1 матеріал/)).toBeInTheDocument();
  });
});
