import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useStyles } from './Footer.styles';
import softServeLogo from './icons/softServeLogo.svg';
import unisefLogo from './icons/unisefLogo.svg';
import { IFooterStyleProps } from '../../types';

interface IFooterNavProps {
  id: number;
  label: string;
  url: string;
}

const navElements: IFooterNavProps[] = [
  {
    id: 1,
    label: 'Про платформу',
    url: '/',
  },
  {
    id: 2,
    label: 'Правила використання',
    url: '/',
  },
  {
    id: 3,
    label: 'Контакти',
    url: '/',
  },
];

const linksList = navElements.map((item) => {
  return (
    <Link component={RouterLink} to={item.url} key={item.id}>
      <Typography component="span">{item.label}</Typography>
    </Link>
  );
});

export const Footer: React.FC = () => {
  const location = useLocation();
  const styleProps: IFooterStyleProps = {
    isAdminPage: location.pathname === '/admin',
  };
  const classes = useStyles(styleProps);

  return (
    <div id="footer" className={classes.container}>
      <Container>
        <Box className={classes.root}>
          <Box className={classes.columnContainer}>
            <Box className={classes.navigationContainer}>
              <Box>
                <Link component={RouterLink} to="/" variant="h3">
                  <span>Доказові</span>
                </Link>
              </Box>
              <Box className={classes.navigationLinks}>{linksList}</Box>
            </Box>
            <Typography className={classes.info} variant="h6" component="div">
              <span>
                Використання матеріалів можливе за умови дотримання Правил
                платформи «Доказові». Статті, блоги та переклади
              </span>
              <span>
                порталу мають просвітницький характер і не можуть замінити або
                скасувати консультацій із лікарем (-кою). Ресурс
              </span>
              <span>призначено для користувачів від 18 років і старших.</span>
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
              <span>© 2021 UNICEF Ukraine. Всі права захищені.</span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
