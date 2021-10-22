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
  title: string;
  isSortable: boolean;
  sortKey?: keyof typeof SortBy;
  initialSortOrder?: keyof typeof Order;
}

const content: IContent[] = [
  {
    title: 'Id',
    isSortable: true,
    sortKey: SortBy.post_id,
  },
  {
    title: 'Заголовок',
    isSortable: true,
    sortKey: SortBy.title,
  },
  {
    title: 'Статус',
    isSortable: false,
  },
  {
    title: 'Дата зміни статусу',
    sortKey: SortBy.modified_at,
    isSortable: true,
  },
  {
    title: 'Тема',
    isSortable: false,
  },
  {
    title: 'Автор',
    isSortable: false,
  },
  {
    title: 'К-сть переглядів, що відображається на сайті',
    isSortable: false,
    initialSortOrder: Order.desc,
  },
  {
    title: 'Реальна к-сть переглядів',
    isSortable: false,
    initialSortOrder: Order.desc,
  },
  {
    title: 'Дії',
    isSortable: false,
  },
];

const MaterialsTableHead: React.FC = () => {
  const dispatch = useDispatch();
  const {
    sort: { order, sortBy },
  } = useSelector(selectMeta);

  const handleSort = (cell: IContent) => {
    let newOrder: keyof typeof Order = cell.initialSortOrder
      ? cell.initialSortOrder
      : Order.asc;

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

export default MaterialsTableHead;
