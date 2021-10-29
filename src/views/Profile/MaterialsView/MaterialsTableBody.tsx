import React from 'react';
import { Link } from 'react-router-dom';
import {
  Chip,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Edit, Archive, Today, Person, Visibility } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectAdminLab } from 'models/adminLab';
import { useStyles } from './styles/MaterialsTableBody.styles';
import MaterialsActionButton from './MaterialsActionButton';
import { PostTypeEnum } from '../../../old/lib/types';

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

    let chipClass: string;

    switch (typeId) {
      case PostTypeEnum.ARTICLE:
        chipClass = 'article';
        break;
      case PostTypeEnum.VIDEO:
        chipClass = 'video';
        break;
      case PostTypeEnum.DOPYS:
        chipClass = 'post';
        break;
      default:
        chipClass = 'default';
    }

    const handleClick = (idx) => {
      // eslint-disable-next-line no-console
      console.log(idx);
    };

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell className={classes.titleCol}>
          <Chip label={typeName} className={classes[chipClass] as string} />
          <Typography variant="h6" component="p">
            {title}
          </Typography>
        </TableCell>
        {/** TODO: status */}
        <TableCell>{status}</TableCell>
        <TableCell>{modifiedAt}</TableCell>
        <TableCell>
          {directions.map((dir) => (
            <Typography variant="h6" component="p" key={dir.label}>
              {dir.label}
            </Typography>
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
