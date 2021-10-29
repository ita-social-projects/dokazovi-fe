import { Breadcrumbs, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from './BasicBreadcrumbs.styles';

export type BreadcrumbsLinksType = { to: string; label: string }[];

interface IProps {
  breadcrumbsLinks: BreadcrumbsLinksType;
  title: string;
}

export const BasicBreadcrumbs: React.FC<IProps> = ({
  breadcrumbsLinks,
  title,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
      <Link className={classes.link} to="/">
        {t(langTokens.common.main)}
      </Link>
      {breadcrumbsLinks.map(({ to, label }) => (
        <Link data-testid="link" className={classes.link} key={to} to={to}>
          {label}
        </Link>
      ))}
      <Typography className={classes.postTitle}>{title}</Typography>
    </Breadcrumbs>
  );
};
