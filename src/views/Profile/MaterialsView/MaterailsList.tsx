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

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
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
        </TableHead>
        <TableBody>
          {postIds.map((postId) => (
            <TableRow key={posts[postId].id}>
              <TableCell>{posts[postId].id}</TableCell>
              <TableCell className={classes.titleCol}>
                <div>{posts[postId].type.name}</div>
                <div>{posts[postId].title}</div>
              </TableCell>
              {/** TODO: status */}
              <TableCell>???</TableCell>
              <TableCell>{posts[postId].modifiedAt}</TableCell>
              <TableCell>
                {posts[postId].directions.map((dir) => (
                  <p key={dir.label}>{dir.label}</p>
                ))}
              </TableCell>
              <TableCell>{`${posts[postId].author.firstName} ${posts[postId].author.lastName}`}</TableCell>
              <TableCell>{posts[postId].uniqueViewsCounter}</TableCell>
              {/** TODO: cannot get modifideViewsCounter */}
              <TableCell>{posts[postId].uniqueViewsCounter}</TableCell>
              <TableCell>
                <Button>delete</Button>
                <Button>edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterailsList;
