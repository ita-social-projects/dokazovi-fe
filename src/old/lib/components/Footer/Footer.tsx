import React, { useContext } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Footer.styles';
import softServeLogo from './icons/softServeLogo.svg';
import unisefLogo from './icons/unisefLogo.svg';
import { IFooterStyleProps } from '../../types';
import i18n, { langTokens } from '../../../../locales/localizationInit';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';

interface IFooterNavProps {
  id: number;
  label: string;
  url: string;
}

export const navElements: IFooterNavProps[] = [
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
    <NavLink to={item.url} key={item.id} exact>
      <Typography component="span">{item.label}</Typography>
    </NavLink>
  );
});

export const Footer: React.FC = () => {
  const location = useLocation();
  const styleProps: IFooterStyleProps = {
    isAdminPage: location.pathname === '/admin',
    isProfilePage: location.pathname === '/profile',
  };
  const classes = useStyles(styleProps);
  const { t } = useTranslation();
  const { mobile } = useContext(ScreenContext);

  return (
    <>
      <div id="footer" className={classes.container}>
        <Container className={classes.root}>
          <Box className={classes.rowContainer}>
            <Box className={classes.navigationContainer}>
              <Box>
                <Link component={RouterLink} to="/" variant="h3">
                  <span>{t(langTokens.common.projectName)}</span>
                </Link>
              </Box>
              {!mobile && (
                <Box className={classes.navigationLinks}>{linksList}</Box>
              )}
            </Box>
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
          </Box>
          <Box className={classes.rowContainer}>
            <Typography className={classes.info} variant="h6" component="div">
              <span>{t(langTokens.footer.shortPolicy)}</span>
            </Typography>
            <Typography className={classes.info} variant="h6" component="div">
              <span>{`© 2022 UNICEF Ukraine. ${t(
                langTokens.footer.allRightsReserved,
              )}.`}</span>
            </Typography>
          </Box>
        </Container>
      </div>
    </>
  );
};
