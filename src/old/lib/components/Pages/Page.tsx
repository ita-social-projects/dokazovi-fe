import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from '../../styles/Page.styles';

export interface IPageProps {
  component: React.ComponentType;
}

const Page: React.FC<IPageProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.page}>
        <props.component />
      </div>
    </Container>
  );
};

export default Page;
