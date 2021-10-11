import React, { useEffect, useState } from 'react';
import { TableCell, TableHead } from '@material-ui/core';
import { SortBy, Order } from 'models/adminlab/types';
import { useDispatch } from 'react-redux';
import { setSort } from 'models/adminlab';

const content = [
  {
    sortByField: SortBy.post_id,
    isSortable: true,
    title: 'Id',
  },
  {
    sortByField: SortBy.title,
    isSortable: true,
    title: 'Заголовок',
  },
  {
    sortByField: SortBy.status,
    isSortable: false,
    title: 'Статус',
  },
  {
    sortByField: SortBy.modifide_at,
    isSortable: true,
    title: 'Дата зміни статусу',
  },
  {
    sortByField: SortBy.type_id,
    isSortable: false,
    title: 'Тема',
  },
  {
    sortByField: SortBy.post_id,
    isSortable: false,
    title: 'Автор',
  },
  {
    sortByField: SortBy.post_id,
    isSortable: false,
    title: 'К-сть переглядів, що відображається на сайті',
  },
  {
    sortByField: SortBy.post_id,
    isSortable: false,
    title: 'Реальна к-сть переглядів',
  },
  {
    sortByField: SortBy.post_id,
    isSortable: false,
    title: 'Дії',
  },
];

const MaterailsTableHead: React.FC = () => {
  const dispatch = useDispatch();
  const [sortByValue, setSortByValue] = useState(SortBy.post_id);
  const [sortOrder, setSortOrder] = useState(Order.desc);

  const handleClick = (sortByField) => {
    if (sortByField === sortByValue) {
      setSortOrder(Order.asc);
      console.log('1');
    } else {
      setSortOrder(Order.desc);
      console.log('2');
    }
    setSortByValue(sortByField);
    // setSortOrder(Order.asc);
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
        onClick={
          cell.isSortable ? () => handleClick(cell.sortByField) : undefined
        }
      >
        {cell.title}
      </TableCell>
    );
  });

  return <TableHead>{cells}</TableHead>;
};

export default MaterailsTableHead;
