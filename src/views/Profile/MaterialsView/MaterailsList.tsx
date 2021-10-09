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
import { useStyles } from './styles/MaterailsList.styles';

const MaterailsList: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminlab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatirealsAction());
  }, []);

  const tableHeadContent = (
    <TableRow>
      <TableCell>Id</TableCell>
      <TableCell className={classes.titleCol}>Заголовок</TableCell>
      <TableCell>Статус</TableCell>
      <TableCell>Дата зміни статусу</TableCell>
      <TableCell>Тема</TableCell>
      <TableCell>Автор</TableCell>
      <TableCell>К-сть переглядів, що відображається на сайті</TableCell>
      <TableCell>Реальна к-сть переглядів</TableCell>
      <TableCell>Дії</TableCell>
    </TableRow>
  );

  const tableBodyContent = postIds.map((postId) => {
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
        <TableHead>{tableHeadContent}</TableHead>
        <TableBody>{tableBodyContent}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterailsList;
