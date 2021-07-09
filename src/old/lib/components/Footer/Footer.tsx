import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Box, Typography, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Footer.styles';
import softServeLogo from './icons/softServeLogo.svg';
import unisefLogo from './icons/unisefLogo.svg';
import { IFooterStyleProps } from '../../types';
import i18n, { langTokens } from '../../../../locales/localizationInit';

interface IFooterNavProps {
  id: number;
  label: string;
  url: string;
}

const navElements: IFooterNavProps[] = [
  {
    id: 1,
    label: i18n.t(langTokens.footer.aboutPlatform),
    url: '/info#about',
  },
  {
    id: 2,
    label: i18n.t(langTokens.footer.termsOfUse),
    url: '/info#rules',
  },
  {
    id: 3,
    label: i18n.t(langTokens.footer.contacts),
    url: '/info#contacts',
  },
];

const linksList = navElements.map((item) => {
  return (
    <NavHashLink to={item.url} key={item.id} exact>
      <Typography component="span">{item.label}</Typography>
    </NavHashLink>
  );
});

export const Footer: React.FC = () => {
  const location = useLocation();
  const styleProps: IFooterStyleProps = {
    isAdminPage: location.pathname === '/admin',
  };
  const classes = useStyles(styleProps);
  const { t } = useTranslation();

  return (
    <div id="footer" className={classes.container}>
      <Container>
        <Box className={classes.root}>
          <Box className={classes.columnContainer}>
            <Box className={classes.navigationContainer}>
              <Box>
                <Link component={RouterLink} to="/" variant="h3">
                  <span>{t(langTokens.common.projectName)}</span>
                </Link>
              </Box>
              <Box className={classes.navigationLinks}>{linksList}</Box>
            </Box>
            <Typography className={classes.info} variant="h6" component="div">
              <span>{t(langTokens.footer.shortPolicy1)}</span>
              <span>{t(langTokens.footer.shortPolicy2)}</span>
              <span>{t(langTokens.footer.shortPolicy3)}</span>
            </Typography>
          </Box>
          <Box className={classes.columnContainer}>
            <Box className={classes.companyLabel}>
              <ul>
                <li>
                  <a
                    href="https://www.unicef.org/ukraine/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={unisefLogo} alt="UNISEF " />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.softserveinc.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={softServeLogo} alt="SoftServe" />
                  </a>
                </li>
              </ul>
            </Box>
            <Typography className={classes.info} variant="h6" component="div">
              <span>{`© 2021 UNICEF Ukraine. ${t(
                langTokens.footer.termsOfUse,
              )}.`}</span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
