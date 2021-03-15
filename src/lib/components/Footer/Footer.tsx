import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useStyles } from './Footer.styles';
import facebook from '../../images/facebook.png';
import twitter from '../../images/twitter.png';
import instagram from '../../images/instagram.png';
import tic_toc from '../../images/tic_toc.png';

interface IHeaderProps {
  id: string;
  label: string;
  url: string;
}

const navElems: IHeaderProps[] = [
  {
    id: '1',
    label: 'Про платформу',
    url: '/',
  },
  {
    id: '2',
    label: 'Правила використання',
    url: '/',
  },
  {
    id: '3',
    label: 'Карта сайту',
    url: '/',
  },
  {
    id: '4',
    label: 'Контакти',
    url: '/',
  },
];

const linksList = navElems.map((item) => {
  return (
    <Link component={RouterLink} to={item.url} key={item.id} variant="body1">
      <Typography variant="h6" component="span">
        {item.label}
      </Typography>
    </Link>
  );
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div id="footer" className={classes.container}>
      <Container>
        <Box className={classes.root}>
          <Box className={classes.navContainer}>
            <Box className={classes.nav}>
              <Link component={RouterLink} to="/" variant="h3">
                <span>Доказові</span>
              </Link>
              {linksList}
            </Box>
            <Box className={classes.socials}>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebook} alt="facebook" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={instagram} alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={tic_toc} alt="Tic Toc" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={twitter} alt="twitter" />
                  </a>
                </li>
              </ul>
            </Box>
          </Box>
          <Typography className={classes.info} variant="h6" component="div">
            <span>
              Використання матеріалів сайту можливе за умови дотримання Правил
              користування сайтом і правил
            </span>
            <span>
              використання матеріалів сайту. Цей ресурс — для користувачів віком
              від 18 років і старших.
            </span>
          </Typography>
          <Typography variant="h6" color="inherit" component="span">
            © 2021 UNICEF UKRAINE. ВСІ ПРАВА ЗАХИЩЕНІ.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Footer;
