import { useQuery } from 'old/lib/hooks/useQuery';
import { IExpert, LoadingStatusEnum } from 'old/lib/types';
import { getExpertById } from 'old/lib/utilities/API/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR_404 } from 'old/lib/constants/routes';
import { LoadingInfo } from 'old/lib/components/Loading/LoadingInfo';
import { PersonalInfo } from '../PersonalInfo/PersonalInfo';

const EditAuthor = () => {
  const query = useQuery();
  const history = useHistory();
  const authorId = query.get('id');
  const loading = LoadingStatusEnum.pending;

  const [loadedAuthor, setLoadedAuthor] = useState<IExpert>();
  const [statusCode, setStatusCode] = useState<number>();

  const fetchAuthor = useCallback(async () => {
    try {
      const id = Number(authorId);
      if (!Number.isInteger(id)) {
        throw new Error();
      }
      const authorRespons = await getExpertById(id);
      const author = authorRespons.data;
      setLoadedAuthor(author);
    } catch (error) {
      setStatusCode(404);
    }
  }, [authorId]);

  useEffect(() => {
    fetchAuthor();
  }, []);

  if (statusCode === 404) {
    history.push(ERROR_404);
  }

  return loadedAuthor ? (
    <PersonalInfo author={loadedAuthor} />
  ) : (
    <LoadingInfo loading={loading} />
  );
};

export default EditAuthor;
