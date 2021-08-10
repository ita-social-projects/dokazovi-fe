import React, { useState } from 'react';
import OperationView from './OperationView';
import Sidemenu from './Sidemenu';
import { IAdminMenuOption } from '../../../../types';
import Page404 from '../../../Errors/Page404';
import { selectAuthorities } from '../../../../../../models/authorities';
import { useSelector } from 'react-redux';

const AdminPage: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IAdminMenuOption | Record<string, never>>({});

  const authorities = useSelector(selectAuthorities).data?.includes('SET_IMPORTANCE');

  return authorities ? (
    <>
      <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
      <OperationView selectedOption={selectedOption} />
    </>
  ) : <><Page404 /></>;
};

export default AdminPage;
