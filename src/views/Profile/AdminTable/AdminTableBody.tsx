import React, { useEffect, useState } from 'react';
import {
  Chip,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAdminLab, selectModifications } from '../../../models/adminLab';
import { useStyles } from './styles/AdminTableBody.styles';
import { PostTypeEnum, IPost } from '../../../old/lib/types';
import ActionButtons from './ActionButtons';
import { langTokens } from '../../../locales/localizationInit';
import { fetchExpertMaterials } from './fetchExpertMaterials';

interface IAdminTableBodyProps {
  expertId: number | undefined;
  isAdmin: boolean | undefined;
}

const AdminTableBody: React.FC<IAdminTableBodyProps> = ({
  expertId,
  isAdmin,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { newPostPublicationDate } = useSelector(selectModifications);
  const { postIds, posts } = useSelector(selectAdminLab);

  // здесь вызываю функцию с параметром 10 (другой автор) чтобы было больше постов
  // у автора, которым я залогинен, всего одна статья, не поиграться с фильтрами потом;

  // вытаскиваем из функции ниже посты и айди к ним (называем к примеру authorPosts, authorPostIds)
  // и в зависимости от isAdmin из пропсов передаем в rows либо postIds/posts как сейчас, либо
  // authorPostIds/authorPosts если isAdmin === false
  fetchExpertMaterials(10);

  const rows = postIds.map((postId) => {
    const {
      id,
      title,
      modifiedAt,
      directions,
      status,
      author: { firstName, lastName },
      type: { id: typeId, name: typeName },
      realViews,
      views,
      publishedAt,
    } = posts[postId];

    const fullName = `${firstName} ${lastName}`;

    const directionsList = directions.map((dir) => (
      <Typography variant="h6" component="p" key={dir.label}>
        {dir.label}
      </Typography>
    ));

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

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell className={classes.titleCol}>
          <Chip label={typeName} className={classes[chipClass] as string} />
          <Typography variant="h6" component="p">
            {title}
          </Typography>
        </TableCell>
        <TableCell>{t(langTokens.admin[status])}</TableCell>
        <TableCell>
          {newPostPublicationDate ? publishedAt : modifiedAt}
        </TableCell>
        <TableCell>{directionsList}</TableCell>
        <TableCell>{fullName}</TableCell>
        <TableCell>{views}</TableCell>
        <TableCell>{realViews}</TableCell>
        <TableCell>
          <ActionButtons
            id={id}
            title={title}
            status={status}
            // postDate={newPostPublicationDate}
          />
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default AdminTableBody;
