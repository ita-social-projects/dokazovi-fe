import React from 'react';
import { Container, Box } from '@material-ui/core';
import ConditionNav from '../../components/ConditionNav';
import ContentSection from '../../components/ContentSection';
import { useStyles } from './Conditions.styles';

export default function Conditions(): JSX.Element {
  const classes = useStyles();

  return (
    <Container>
      <Box>
        <ConditionNav />
        <ContentSection type={'about'} />
        <ContentSection type={'rules'} />
        <ContentSection type={'contacts'} />
      </Box>
    </Container>
  );
}
