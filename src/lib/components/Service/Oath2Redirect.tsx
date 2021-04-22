import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../authProvider/AuthContex';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Oath2Redirect: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { setToken } = useContext(AuthContext);

  const token = query.get('token');

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      console.error('NO TOKEN');
    }
  }, [token, dispatch, history]);

  return <></>;
};

export default Oath2Redirect;
