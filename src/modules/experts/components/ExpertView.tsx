import { Container } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import experts from '../mockDataExperts';
import ExpertInfo from './ExpertInfo';

const ExpertView: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();

  return (
    <Container>
      <ExpertInfo expert={experts[+expertId] /* tmp mock */} />
      {/* materials */}
    </Container>
  );
};

export default ExpertView;
