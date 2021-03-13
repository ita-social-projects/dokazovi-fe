import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BorderBottom from '../../../lib/components/Border';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExpertById } from '../store/expertsSlice';
import ExpertInfo from './ExpertInfo';
import ExpertMaterialsContainer from './ExpertMaterialsContainer';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';
import { LoadingStatusEnum } from '../../../lib/types';
import PageTitle from '../../../lib/components/Pages/PageTitle';

const ExpertProfileView: React.FC = () => {
  const dispatch = useDispatch();
  const { expertId } = useParams<{ expertId: string }>();
  const {
    meta: { loading },
  } = useSelector((state: RootStateType) => state.experts.experts);

  const { experts: allExperts } = useSelector(
    (state: RootStateType) => state.data,
  );
  const selectedExpert = allExperts[expertId];

  useEffect(() => {
    dispatch(fetchExpertById(Number(expertId)));
  }, [expertId]);

  return (
    <>
      {loading === LoadingStatusEnum.pending ? (
        <LoadingContainer loading={loading} />
      ) : (
        <>
          {selectedExpert && (
            <>
              <PageTitle
                title={`${selectedExpert.firstName} ${selectedExpert.lastName}`}
              />
              <ExpertInfo expert={selectedExpert} />
            </>
          )}
          <BorderBottom />
          <ExpertMaterialsContainer expertId={expertId} />
        </>
      )}
    </>
  );
};

export default ExpertProfileView;
