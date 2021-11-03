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
import { selectAdminLab, archiveAdminPost } from 'models/adminLab';
import { useStyles } from './styles/AdminTableBody.styles';
import AdminActionButton from './AdminActionButton';
import { PostStatus, PostTypeEnum } from '../../../old/lib/types';
import { useActions } from '../../../shared/hooks';

const AdminTableBody: React.FC = () => {
  const classes = useStyles();
  const { postIds, posts } = useSelector(selectAdminLab);
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);

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

    const editPostLink = `/edit-post?id=${id}`;
    const fullName = `${firstName} ${lastName}`;

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

    const postStatuses = {
      [PostStatus.DRAFT]: 'Чернетка',
      [PostStatus.MODERATION_FIRST_SIGN]: 'Не переглянутий',
      [PostStatus.MODERATION_SECOND_SIGN]: 'На модерації',
      [PostStatus.PUBLISHED]: 'Опублікований',
      [PostStatus.ARCHIVED]: 'Архівований',
    };

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
        <TableCell>{postStatuses[status]}</TableCell>
        <TableCell>{modifiedAt}</TableCell>
        <TableCell>
          {directions.map((dir) => (
            <Typography variant="h6" component="p" key={dir.label}>
              {dir.label}
            </Typography>
          ))}
        </TableCell>
        <TableCell>{fullName}</TableCell>
        <TableCell>{modifiedViewsCounter}</TableCell>
        <TableCell>{uniqueViewsCounter}</TableCell>
        <TableCell>
          <Link to={editPostLink} target="_blank">
            <AdminActionButton
              title="Редагувати"
              icon={<Edit />}
              onClick={() => handleClick(id)}
            />
          </Link>
          <AdminActionButton
            title="Архівувати"
            icon={<Archive />}
            onClick={() => boundedArchiveAdminPost({ id })}
          />
          <AdminActionButton
            title="Змінити дату публікації"
            icon={<Today />}
            onClick={() => handleClick(id)}
          />
          <AdminActionButton
            title="Змінити автора"
            icon={<Person />}
            onClick={() => handleClick(id)}
          />
          <AdminActionButton
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

export default AdminTableBody;
