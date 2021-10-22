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

const MaterailsTableBody: React.FC = () => {
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
      modifideViewsCounter,
    } = posts[postId];

    const chipStyle = { backgroundColor: '#e0e0e0' };
    if (typeId === 1) {
      chipStyle.backgroundColor = '#987D7C';
    }
    if (typeId === 2) {
      chipStyle.backgroundColor = '#A09CB0';
    }
    if (typeId === 3) {
      chipStyle.backgroundColor = '#A3B9C9';
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
        <TableCell>{modifideViewsCounter}</TableCell>
        <TableCell>
          <Button>delete</Button>
          <Button>edit</Button>
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default MaterailsTableBody;
