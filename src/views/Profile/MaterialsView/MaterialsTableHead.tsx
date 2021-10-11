import React, { useEffect, useState } from 'react';
import { TableCell, TableHead } from '@material-ui/core';
import { SortBy, Order } from 'models/adminlab/types';
import { useDispatch } from 'react-redux';
import { setSort } from 'models/adminlab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
  const [sortByValue, setSortByValue] = useState<keyof typeof SortBy>(
    SortBy.post_id,
  );
  const [sortOrder, setSortOrder] = useState<keyof typeof Order>(Order.desc);
  const icon =
    sortOrder === Order.asc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;

  const handleClick = (sortKey) => {
    let newOrder: keyof typeof Order = Order.desc;
    if (sortKey === sortByValue) {
      newOrder = sortOrder === Order.desc ? Order.asc : Order.desc;
    }

    setSortOrder(newOrder);
    setSortByValue(sortKey);
  };

  useEffect(() => {
    dispatch(
      setSort({
        sortBy: sortByValue,
        order: sortOrder,
      }),
    );
  }, [sortByValue, sortOrder]);

  const cells = content.map((cell) => {
    return (
      <TableCell
        key={cell.title}
        onClick={cell.isSortable ? () => handleClick(cell.sortKey) : undefined}
      >
        {cell.title}
        {cell.sortKey === sortByValue && icon}
      </TableCell>
    );
  });

  return <TableHead>{cells}</TableHead>;
};

export default MaterailsTableHead;
