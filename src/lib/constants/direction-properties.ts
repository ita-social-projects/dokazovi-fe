import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/rootReducer';

export const DirectionProperties = () => {
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  return ('');
};
