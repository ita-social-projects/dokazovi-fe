import { useSelector } from 'react-redux';
import { selectAuthorities } from '../../../models/authorities';

export const useCheckAdmin = () => {
  const authorities = useSelector(selectAuthorities);
  return authorities?.data?.includes('SET_IMPORTANCE');
};
