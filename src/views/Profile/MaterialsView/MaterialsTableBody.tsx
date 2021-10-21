import React from 'react';
import { Button, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAdminlab } from 'models/adminlab';
import { useStyles } from './styles/MaterailsTable.styles';

const MaterailsTableBody: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminlab);

  const tableBodyRows = postIds.map((postId) => {
    const {
      id,
      title,
      modifiedAt,
      directions,
      status,
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
        <TableCell>{status}</TableCell>
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

  return <TableBody>{tableBodyRows}</TableBody>;
};

export default MaterailsTableBody;
