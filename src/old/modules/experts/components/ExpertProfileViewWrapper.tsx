import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IExpert } from '../../../lib/types';
import { getExpertById } from '../../../lib/utilities/API/api';
import ExpertProfileView from './ExpertProfileView';
import { setGALocation } from '../../../../utilities/setGALocation';
import { ERROR_404 } from '../../../lib/constants/errors';

const ExpertProfileViewWrapper: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const history = useHistory();
  const [loadedExpert, setLoadedExpert] = useState<IExpert>();
  const [statusCode, setStatusCode] = useState<number>();

  const fetchExpert = useCallback(async () => {
    try {
      const expertResponse = await getExpertById(Number(expertId));
      setLoadedExpert(expertResponse.data);
    } catch (error) {
      setStatusCode(404);
    }
  }, [expertId]);

  useEffect(() => {
    setGALocation(window);
  }, []);

  useEffect(() => {
    fetchExpert();
  }, [fetchExpert]);

  if (statusCode === 404) {
    history.push(ERROR_404);
  }

  return <>{loadedExpert && <ExpertProfileView expert={loadedExpert} />}</>;
};

export default ExpertProfileViewWrapper;
