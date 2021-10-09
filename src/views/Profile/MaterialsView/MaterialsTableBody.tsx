import React from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
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

  return <>{tableBodyRows}</>;
};

export default MaterailsTableBody;
