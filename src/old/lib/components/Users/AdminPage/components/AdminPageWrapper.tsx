import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import OperationView from './OperationView';
import Sidemenu from './Sidemenu';
import { IAdminMenuOption } from '../../../../types';
import { selectCurrentUser } from '../../../../../../models/user';
import Page404 from '../../../Errors/Page404';

const AdminPage: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IAdminMenuOption | Record<string, never>
  >({});

  const user = useSelector(selectCurrentUser);

  return user?.data?.id === 27  ?  (
    <>
      <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
      <OperationView selectedOption={selectedOption} />
    </>
  ) : <><Page404/></>;
};

export default AdminPage;
