import React from 'react';
import {
  Chip,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAdminLab } from 'models/adminLab';
import { useStyles } from './styles/AdminTableBody.styles';
import { PostStatus, PostTypeEnum } from '../../../old/lib/types';
import ActionButtons from './ActionButtons';

const AdminTableBody: React.FC = () => {
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
          <ActionButtons id={id} />
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default AdminTableBody;
