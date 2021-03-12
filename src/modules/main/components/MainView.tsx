import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { ExpertsViewCard } from '../../../lib/components/Experts/ExpertsViewCard';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts } from '../store/mainSlice';
import { selectExpertsByIds } from '../../../store/selectors';

const MainView: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExperts());
  }, []);

  const {
    expertIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.experts);
  const experts = selectExpertsByIds(expertIds);

  return (
    <Box display="flex" flexDirection="column">
      <ImportantContainer />
      <NewestContainer />
      <ExpertsViewCard cards={experts} loading={loading} />
    </Box>
  );
};

export default MainView;
