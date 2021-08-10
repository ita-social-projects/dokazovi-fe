import React, { useContext, useState } from 'react';
import OperationView from './OperationView';
import Sidemenu from './Sidemenu';
import { IAdminMenuOption } from '../../../../types';
import Page404 from '../../../Errors/Page404';
import { AuthContext } from '../../../../../provider/AuthProvider/AuthContext';

const AdminPage: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IAdminMenuOption | Record<string, never>
  >({});

  const {authenticated} = useContext(AuthContext)

  return  (
    <>
      <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
      <OperationView selectedOption={selectedOption} />
    </>
  )/* : <><Page404/></>;*/
};

export default AdminPage;
