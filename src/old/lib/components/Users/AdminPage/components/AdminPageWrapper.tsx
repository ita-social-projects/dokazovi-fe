import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from '../styles/AdminPageWrapper.styles';
import OperationView from './OperationView';
import Sidemenu from './Sidemenu';
import { IAdminMenuOption } from '../../../../types';
import Page404 from '../../../Errors/Page404';
import { PageTitle } from '../../../../../../components/Page/PageTitle';
import appTitle from '../../../../constants/appTitle';
import { useCheckAdmin } from '../../../../hooks/useCheckAdmin';

const AdminPage: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IAdminMenuOption | Record<string, never>
  >({
    section: 'Головна',
    label: 'Керування матеріалами',
    value: 'materials',
  });
  const classes = useStyles();

  const authorities = useCheckAdmin();

  return authorities ? (
    <Box className={classes.container}>
      <PageTitle title={appTitle} />
      <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
      <OperationView selectedOption={selectedOption} />
    </Box>
  ) : (
    <>
      <Page404 />
    </>
  );
};

export default AdminPage;
