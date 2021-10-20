/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Container, Box } from '@material-ui/core';
import ConditionNav from '../../components/ConditionNav';
import ContentSection from '../../components/ContentSection';
import { ConditionsContentSectionEnum } from '../../old/lib/types';
import { useStyles } from './Conditions.styles';

export default function Conditions(): JSX.Element {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Box>
        <ConditionNav />
        <ContentSection type={ConditionsContentSectionEnum.ABOUT} />
        <ContentSection type={ConditionsContentSectionEnum.RULES} />
        <ContentSection type={ConditionsContentSectionEnum.CONTACTS} />
      </Box>
    </Container>
  );
}
