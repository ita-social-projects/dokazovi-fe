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
    label: 'Доказові',
    url: '/',
  },
  {
    id: '2',
    label: 'Про платформу',
    url: '/',
  },
  {
    id: '3',
    label: 'Правила використання',
    url: '/',
  },
  {
    id: '4',
    label: 'Карта сайту',
    url: '/',
  },
  {
    id: '5',
    label: 'Контакти',
    url: '/',
  },
];

const linksList = navElems.map((item) => {
  return (
    <Link component={RouterLink} to={item.url} key={item.id} variant="body1">
      <span> {item.label}</span>
    </Link>
  );
});

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Box className={classes.root}>
        <Box className={classes.navContainer}>
          <Box className={classes.innerNav}>{linksList}</Box>
          <Box className={classes.outerNav}>
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
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
            </ul>
          </Box>
        </Box>
        <Typography className={classes.info} variant="body1">
          <span>
            Використання матеріалів сайту можливе за умови дотримання Правил
            користування сайтом і правил
          </span>
          <span>
            використання матеріалів сайту. Цей ресурс — для користувачів віком
            від 18 років і старших.
          </span>
        </Typography>
        <Typography
          className={classes.infoButtom}
          color="inherit"
          variant="body1"
        >
          © 2021 UNICEF UKRAINE. ВСІ ПРАВА ЗАХИЩЕНІ.
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
