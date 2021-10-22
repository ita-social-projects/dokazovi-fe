import React from 'react';
import {
  Button,
  Chip,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAdminlab } from 'models/adminlab';
import { useStyles } from './styles/MaterialsTableBody.styles';

const MaterialsTableBody: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminlab);

  const rows = postIds.map((postId) => {
    const {
      id,
      title,
      modifiedAt,
      directions,
      status,
      author: { firstName, lastName },
      type: { id: typeId, name: typeName },
      uniqueViewsCounter,
      modifiedViewsCounter,
    } = posts[postId];

    const chipStyle = { backgroundColor: '#e0e0e0' };
    if (typeId === 1) {
      chipStyle.backgroundColor = '#987d7c';
    }
    if (typeId === 2) {
      chipStyle.backgroundColor = '#968ac2';
    }
    if (typeId === 3) {
      chipStyle.backgroundColor = '#a3c9ad';
    }

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell className={classes.titleCol}>
          <Chip label={typeName} style={chipStyle} />
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
        <TableCell>{modifiedViewsCounter}</TableCell>
        <TableCell>
          <Button>delete</Button>
          <Button>edit</Button>
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default MaterialsTableBody;
