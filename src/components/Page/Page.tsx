import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './Page.styles';
import { ScreenContext } from '../../old/provider/MobileProvider/ScreenContext';

export interface IPageProps {
  component: React.ComponentType;
}

const Page: React.FC<IPageProps> = (props) => {
  const classes = useStyles();

  const { mobile } = useContext(ScreenContext);

  return (
    <Container
      className={mobile ? classes.pageMobile : classes.page}
      disableGutters
    >
      <props.component />
    </Container>
  );
};

export default Page;
