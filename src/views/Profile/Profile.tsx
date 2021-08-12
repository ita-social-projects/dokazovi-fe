import React, { useContext, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import i18n, { langTokens } from '../../locales/localizationInit';
import { Sidemenu } from './Sidemenu';
import { OperationView } from './OperationView';
import { IProfileMenuOption } from '../../old/lib/types';
import Page404 from '../../old/lib/components/Errors/Page404';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';

const Profile: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IProfileMenuOption | Record<string, never>
  >({
    label: i18n.t(langTokens.common.myInfo),
    value: 'info',
  });

  const { authenticated } = useContext(AuthContext);

  return authenticated ? (
    <Container>
      <Box>
        <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
        <OperationView selectedOption={selectedOption} />
      </Box>
    </Container>
  ) : (
    <>
      <Page404 />
    </>
  );
};

export default Profile;
