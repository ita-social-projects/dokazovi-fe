import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { Order, SortBy } from 'models/adminLab/types';
import { useSelector } from 'react-redux';
import { selectMeta, setSort } from 'models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/MaterialsTableHead.styles';

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
    isSortable: true,
    sortKey: SortBy.status,
  },
  {
    label: 'Дата зміни статусу',
    sortKey: SortBy.modified_at,
    isSortable: true,
    initialSortOrder: Order.desc,
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
  const classes = useStyles();
  const [boundedSetSort] = useActions([setSort]);
  const {
    sort: { order, sortBy },
  } = useSelector(selectMeta);

  const handleSort = (cell: IContent) => {
    const { sortKey, initialSortOrder } = cell;
    let newOrder: keyof typeof Order = initialSortOrder || Order.asc;

    if (sortKey === sortBy) {
      newOrder = order === Order.desc ? Order.asc : Order.desc;
    }

    boundedSetSort({
      sortBy: sortKey as keyof typeof SortBy,
      order: newOrder,
    });
  };

  const cells = content.map((cell) => {
    const { label, isSortable, sortKey } = cell;

    return (
      <TableCell key={label} sortDirection={sortBy === sortKey ? order : false}>
        {isSortable ? (
          <TableSortLabel
            active={sortBy === sortKey}
            direction={order}
            className={classes.sortable}
            onClick={() => handleSort(cell)}
          >
            {label}
          </TableSortLabel>
        ) : (
          label
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
