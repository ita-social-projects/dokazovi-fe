import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getMatirealsAction, selectAdminlab } from 'models/adminlab';
import { SortBy, Order } from 'models/adminlab/types';
import { useStyles } from './styles/MaterailsList.styles';

const MaterailsList: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminlab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMatirealsAction({
        sortBy: SortBy.post_id,
        order: Order.desc,
        filters: {},
      }),
    );
  }, []);

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

  const tableHeadRows = tableHeadContent.map((item) => {
    return <TableCell key={item.title}>{item.title}</TableCell>;
  });

  const tableBodyRows = postIds.map((postId) => {
    const {
      id,
      title,
      modifiedAt,
      directions,
      author: { firstName, lastName },
      type: { name: typeName },
      uniqueViewsCounter,
      modifideViewsCounter,
    } = posts[postId];

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell className={classes.titleCol}>
          <p>{typeName}</p>
          <p>{title}</p>
        </TableCell>
        {/** TODO: status */}
        <TableCell>???</TableCell>
        <TableCell>{modifiedAt}</TableCell>
        <TableCell>
          {directions.map((dir) => (
            <p key={dir.label}>{dir.label}</p>
          ))}
        </TableCell>
        <TableCell>{`${firstName} ${lastName}`}</TableCell>
        <TableCell>{uniqueViewsCounter}</TableCell>
        <TableCell>{modifideViewsCounter}</TableCell>
        <TableCell>
          <Button>delete</Button>
          <Button>edit</Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>{tableHeadRows}</TableHead>
        <TableBody>{tableBodyRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterailsList;
