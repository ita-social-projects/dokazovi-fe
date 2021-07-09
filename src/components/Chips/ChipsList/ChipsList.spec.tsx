import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ChipsList } from './ChipsList';
import { store } from '../../../models/store';
import { ChipFilterType, IOrigin, IPostType } from '../../../old/lib/types';

const ORIGINS_MOCK = 'Думки експертів, Медитека';
const DIRECTION_MOCK = 'Хірургія';
const POST_TYPE_MOCK = 'Стаття';
const FILTERS_MOCK = [
  { id: 1, name: 'Думки експертів' },
  { id: 2, name: 'Медитека' },
];

describe('ChipsList', () => {
  it('should render the chipslist', () => {
    render(
      <Provider store={store}>
        <ChipsList filtersPlural={FILTERS_MOCK} checkedNames={ORIGINS_MOCK} />
      </Provider>,
    );
    const resultLength = 2;
    const blocks = screen.queryAllByTestId('chip');
    expect(blocks).toHaveLength(resultLength);
  });

  it('should render the only available direction with correct class', () => {
    render(
      <Provider store={store}>
        <ChipsList
          checkedNames={DIRECTION_MOCK}
          TheOnlyAvailableDirection={DIRECTION_MOCK}
        />
      </Provider>,
    );
    expect(screen.getByText('Хірургія')).toHaveClass('MuiChip-label');
  });

  it('should render the only available post type', () => {
    render(
      <Provider store={store}>
        <ChipsList
          checkedNames={POST_TYPE_MOCK}
          TheOnlyAvailablePostType={POST_TYPE_MOCK}
        />
      </Provider>,
    );
    expect(screen.getByText('Стаття')).toBeInTheDocument();
  });
});

describe('events', () => {
  it('should delete the chip', () => {
    const handleDeleteMock = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <ChipsList
          filtersPlural={FILTERS_MOCK}
          checkedNames={ORIGINS_MOCK}
          handleDelete={handleDeleteMock}
        />
      </Provider>,
    );
    const deleteIcon = container.querySelector('.MuiChip-deleteIcon');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fireEvent.click(deleteIcon);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  });
});
