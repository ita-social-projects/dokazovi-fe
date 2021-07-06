/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Container, Box } from '@material-ui/core';
import ConditionNav from '../../components/ConditionNav';
import ContentSection from '../../components/ContentSection';

export default function Conditions(): JSX.Element {
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
