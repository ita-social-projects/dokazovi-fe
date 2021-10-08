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
import { IPost } from 'old/lib/types';
import { useStyles } from './styles/MaterailsList.styles';
import { getPosts } from '../../../old/lib/utilities/API/api';

const MaterailsList: React.FC = () => {
  const classes = useStyles();

  const [postsList, setpostsList] = useState<IPost[]>([]);

  useEffect(() => {
    getPosts('latest-all', {
      params: {
        size: 12,
      },
    }).then((response) => {
      setpostsList(response.data.content);
    });
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
          {postsList.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell className={classes.titleCol}>{post.title}</TableCell>
              <TableCell>???</TableCell>
              <TableCell>{post.modifiedAt}</TableCell>
              <TableCell>
                {post.directions.map((dir) => (
                  <p key={dir.label}>{dir.label}</p>
                ))}
              </TableCell>
              <TableCell>{`${post.author.firstName} ${post.author.lastName}`}</TableCell>
              <TableCell>100?</TableCell>
              <TableCell>100?</TableCell>
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
