import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { SortBy, Order } from 'models/adminLab/types';
import { useSelector } from 'react-redux';
import { selectMeta, setSort } from 'models/adminLab';
import { useActions } from '../../../shared/hooks';

interface IContent {
  label: string;
  isSortable: boolean;
  sortKey?: keyof typeof SortBy;
  initialSortOrder?: keyof typeof Order;
}

const content: IContent[] = [
  {
    label: 'Id',
    isSortable: true,
    sortKey: SortBy.post_id,
  },
  {
    label: 'Заголовок',
    isSortable: true,
    sortKey: SortBy.title,
  },
  {
    label: 'Статус',
    isSortable: false,
  },
  {
    label: 'Дата зміни статусу',
    sortKey: SortBy.modified_at,
    isSortable: true,
  },
  {
    label: 'Тема',
    isSortable: false,
  },
  {
    label: 'Автор',
    isSortable: false,
  },
  {
    label: 'К-сть переглядів, що відображається на сайті',
    isSortable: false,
    initialSortOrder: Order.desc,
  },
  {
    label: 'Реальна к-сть переглядів',
    isSortable: false,
    initialSortOrder: Order.desc,
  },
  {
    label: 'Дії',
    isSortable: false,
  },
];

const MaterialsTableHead: React.FC = () => {
  const [boundedSetSort] = useActions([setSort]);
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

    boundedSetSort({
      sortBy: cell.sortKey as keyof typeof SortBy,
      order: newOrder,
    });
  };

  const cells = content.map((cell) => {
    return (
      <TableCell
        key={cell.label}
        sortDirection={sortBy === cell.sortKey ? order : false}
      >
        {cell.isSortable ? (
          <TableSortLabel
            active={sortBy === cell.sortKey}
            direction={order}
            onClick={() => handleSort(cell)}
          >
            {cell.label}
          </TableSortLabel>
        ) : (
          cell.label
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
