import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import i18n, { langTokens } from '../../locales/localizationInit';
import { Sidemenu } from './Sidemenu';
import { OperationView } from './OperationView';
import { IProfileMenuOption } from '../../old/lib/types';

const Profile: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IProfileMenuOption | Record<string, never>
  >({
    label: i18n.t(langTokens.common.materials),
    value: 'materials',
  });

  return (
    <Container>
      <Box>
        <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
        <OperationView selectedOption={selectedOption} />
      </Box>
    </Container>
  );
};

export default Profile;
