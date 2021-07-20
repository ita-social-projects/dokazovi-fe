import React, { useState } from 'react';
import OperationView from './OperationView';
import Sidemenu from './Sidemenu';
import { IAdminMenuOption } from '../../../../types';

const AdminPage: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IAdminMenuOption | Record<string, never>
  >({});

  return (
    <>
      <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
      <OperationView selectedOption={selectedOption} />
    </>
  );
};

export default AdminPage;
