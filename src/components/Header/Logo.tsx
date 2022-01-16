import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './Header.styles';

export const Logo = ({ mobile, isSearchVisible }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  if (isSearchVisible) return null;

  return (
    <>
      <Box display="flex">
        <Link to="/">
          <Typography
            className={mobile ? classes.logoMobile : classes.logo}
            variant="h1"
          >
            {t(langTokens.common.projectName)}
          </Typography>
        </Link>
      </Box>
    </>
  );
};
