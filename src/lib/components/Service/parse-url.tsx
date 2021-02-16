import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { loginUser } from '../../../store/authSlice';
import { LocalStorageKeys } from '../../types';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ParseUrl: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const token = query.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);

      setTimeout(() => {
        dispatch(loginUser());
        history.push(`/`);
      });
    } else {
      console.error('NO TOKEN');
    }
  }, [token]);

  return <></>;
};

export default ParseUrl;
