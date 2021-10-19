import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { SortBy, Order } from 'models/adminlab/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeta, setSort } from 'models/adminlab';

interface IContent {
  sortKey?: keyof typeof SortBy;
  isSortable: boolean;
  isSortInverted?: boolean;
  title: string;
}

const content: IContent[] = [
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
    isSortable: false,
    title: 'Статус',
  },
  {
    sortKey: SortBy.modified_at,
    isSortable: true,
    title: 'Дата зміни статусу',
  },
  {
    isSortable: false,
    title: 'Тема',
  },
  {
    isSortable: false,
    title: 'Автор',
  },
  {
    isSortable: false,
    isSortInverted: true,
    title: 'К-сть переглядів, що відображається на сайті',
  },
  {
    isSortable: false,
    isSortInverted: true,
    title: 'Реальна к-сть переглядів',
  },
  {
    isSortable: false,
    title: 'Дії',
  },
];

const MaterailsTableHead: React.FC = () => {
  const dispatch = useDispatch();
  const {
    sort: { order, sortBy },
  } = useSelector(selectMeta);

  const handleSort = (cell: IContent) => {
    let newOrder: keyof typeof Order = Order.asc;
    if (cell.isSortInverted) {
      newOrder = Order.desc;
    }

    if (cell.sortKey === sortBy) {
      newOrder = order === Order.desc ? Order.asc : Order.desc;
    }

    dispatch(
      setSort({
        sortBy: cell.sortKey as keyof typeof SortBy,
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
            onClick={() => handleSort(cell)}
          >
            {cell.title}
          </TableSortLabel>
        ) : (
          cell.title
        )}
      </TableCell>
    );
  });

  return (
    <TableHead>
      <TableRow>{cells}</TableRow>
    </TableHead>
  );
};

export default MaterailsTableHead;
