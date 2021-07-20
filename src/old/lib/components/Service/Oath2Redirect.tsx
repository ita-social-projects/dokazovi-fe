import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { setGALocation } from '../../../../utilities/setGALocation';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Oath2Redirect: React.FC = () => {
  const query = useQuery();
  const { setAuthorization } = useContext(AuthContext);

  const token = query.get('token');

  useEffect(() => {
    setGALocation(window);
  }, []);

  useEffect(() => {
    if (token) {
      setAuthorization(token);
    } else {
      // eslint-disable-next-line no-console
      console.error('NO TOKEN');
    }
  }, [token]);

  return <></>;
};

export default Oath2Redirect;
