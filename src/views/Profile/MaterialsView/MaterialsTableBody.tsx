import React from 'react';
import { Link } from 'react-router-dom';
import { Chip, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Edit, Archive, Today, Person, Visibility } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectAdminLab } from 'models/adminLab';
import { useStyles } from './styles/MaterialsTableBody.styles';
import MaterialsActionButton from './MaterialsActionButton';

const MaterialsTableBody: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminLab);

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

    const handleClick = (idx) => {
      // eslint-disable-next-line no-console
      console.log(idx);
    };

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
          <Link to={`/edit-post?id=${id}`} target="_blank">
            <MaterialsActionButton
              title="Редагувати"
              icon={<Edit />}
              onClick={() => handleClick(id)}
            />
          </Link>
          <MaterialsActionButton
            title="Архівувати"
            icon={<Archive />}
            onClick={() => handleClick(id)}
          />
          <MaterialsActionButton
            title="Змінити дату публікації"
            icon={<Today />}
            onClick={() => handleClick(id)}
          />
          <MaterialsActionButton
            title="Змінити автора"
            icon={<Person />}
            onClick={() => handleClick(id)}
          />
          <MaterialsActionButton
            title="Змінити кількість переглядів"
            icon={<Visibility />}
            onClick={() => handleClick(id)}
          />
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default MaterialsTableBody;
