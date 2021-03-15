import { useLocation } from 'react-router-dom';

export const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};
