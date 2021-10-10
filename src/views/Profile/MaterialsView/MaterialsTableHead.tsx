import React from 'react';
import { TableCell, TableHead } from '@material-ui/core';

const tableHeadContent = [
  { title: 'Id' },
  { title: 'Заголовок' },
  { title: 'Статус' },
  { title: 'Дата зміни статусу' },
  { title: 'Тема' },
  { title: 'Автор' },
  { title: 'К-сть переглядів, що відображається на сайті' },
  { title: 'Реальна к-сть переглядів' },
  { title: 'Дії' },
];

const MaterailsTableHead: React.FC = () => {
  const tableHeadRows = tableHeadContent.map((item) => {
    return <TableCell key={item.title}>{item.title}</TableCell>;
  });

  return <TableHead>{tableHeadRows}</TableHead>;
};

export default MaterailsTableHead;
