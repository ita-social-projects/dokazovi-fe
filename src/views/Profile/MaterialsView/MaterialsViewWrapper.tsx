import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MaterialsView } from './MaterialsView';
import { setGALocation } from '../../../utilities/setGALocation';
import { IExpert } from '../../../old/lib/types';
import { ERROR_404 } from '../../../old/lib/constants/routes';
import { getCurrentUser } from '../../../old/lib/utilities/API/api';

export const MaterialsViewWrapper: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const history = useHistory();
  const [loadedExpert, setLoadedExpert] = useState<IExpert>();
  const [statusCode, setStatusCode] = useState<number>();

  const fetchExpert = useCallback(async () => {
    try {
      const expertResponse = await getCurrentUser();
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
  console.log(loadedExpert);
  return <>{loadedExpert && <MaterialsView expert={loadedExpert} />}</>;
};
