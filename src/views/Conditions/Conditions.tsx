/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Container, Box } from '@material-ui/core';
import ConditionNav from '../../components/ConditionNav';
import ContentSection from '../../components/ContentSection';
import { ConditionsContentSectionEnum } from '../../old/lib/types';

export default function Conditions(): JSX.Element {
  return (
    <Container>
      <Box>
        <ConditionNav />
        <ContentSection type={ConditionsContentSectionEnum.ABOUT} />
        <ContentSection type={ConditionsContentSectionEnum.RULES} />
        <ContentSection type={ConditionsContentSectionEnum.CONTACTS} />
      </Box>
    </Container>
  );
}
