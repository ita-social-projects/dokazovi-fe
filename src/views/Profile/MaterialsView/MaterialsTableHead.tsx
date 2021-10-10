import React from 'react';
import { TableCell, TableHead } from '@material-ui/core';
import { SortBy } from 'models/adminlab/types';

const tableHeadContent = [
  {
    sortKey: SortBy.post_id,
    title: 'Id',
  },
  {
    sortKey: SortBy.title,
    title: 'Заголовок',
  },
  {
    sortKey: SortBy.status,
    title: 'Статус',
  },
  {
    sortKey: SortBy.modifide_at,
    title: 'Дата зміни статусу',
  },
  {
    sortKey: SortBy.type_id,
    title: 'Тема',
  },
  {
    sortKey: SortBy.post_id,
    title: 'Автор',
  },
  {
    sortKey: SortBy.post_id,
    title: 'К-сть переглядів, що відображається на сайті',
  },
  {
    sortKey: SortBy.post_id,
    title: 'Реальна к-сть переглядів',
  },
  {
    sortKey: SortBy.post_id,
    title: 'Дії',
  },
];

const MaterailsTableHead: React.FC = () => {
  const tableHeadRows = tableHeadContent.map((item) => {
    return <TableCell key={item.title}>{item.title}</TableCell>;
  });

  return <TableHead>{tableHeadRows}</TableHead>;
};

export default MaterailsTableHead;
