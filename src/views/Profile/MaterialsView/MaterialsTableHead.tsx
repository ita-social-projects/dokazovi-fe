import React from 'react';
import { TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import { SortBy, Order } from 'models/adminlab/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeta, setSort } from 'models/adminlab';

const content = [
  {
    sortKey: SortBy.post_id,
    isSortable: true,
    title: 'Id',
  },
  {
    sortKey: SortBy.title,
    isSortable: true,
    title: 'Заголовок',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'Статус',
  },
  {
    sortKey: SortBy.modified_at,
    isSortable: true,
    title: 'Дата зміни статусу',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'Тема',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'Автор',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'К-сть переглядів, що відображається на сайті',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'Реальна к-сть переглядів',
  },
  {
    sortKey: null,
    isSortable: false,
    title: 'Дії',
  },
];

const MaterailsTableHead: React.FC = () => {
  const dispatch = useDispatch();
  const {
    sort: { order, sortBy },
  } = useSelector(selectMeta);

  const handleClick = (sortKey: keyof typeof SortBy | null) => {
    let newOrder = Order.asc;

    if (sortKey === sortBy) {
      newOrder = order === Order.desc ? Order.asc : Order.desc;
    }

    dispatch(
      setSort({
        sortBy: sortKey as keyof typeof SortBy,
        order: newOrder,
      }),
    );
  };

  const cells = content.map((cell) => {
    return (
      <TableCell
        key={cell.title}
        sortDirection={sortBy === cell.sortKey ? order : false}
      >
        {cell.isSortable ? (
          <TableSortLabel
            active={sortBy === cell.sortKey}
            direction={order}
            onClick={() => handleClick(cell.sortKey)}
          >
            {cell.title}
          </TableSortLabel>
        ) : (
          cell.title
        )}
      </TableCell>
    );
  });

  return <TableHead>{cells}</TableHead>;
};

export default MaterailsTableHead;
