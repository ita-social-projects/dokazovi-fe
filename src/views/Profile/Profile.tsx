import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import i18n, { langTokens } from '../../locales/localizationInit';
import { Sidemenu } from './Sidemenu';
import { OperationView } from './OperationView';
import { IProfileMenuOption, IExpert } from '../../old/lib/types';

export interface IProfileProps {
  expert: IExpert;
}

const Profile: React.FC<IProfileProps> = ({ expert }) => {
  const [selectedOption, changeOption] = useState<
    IProfileMenuOption | Record<string, never>
  >({
    label: i18n.t(langTokens.common.myInfo),
    value: 'info',
  });

  return (
    <Container>
      <Box>
        <Sidemenu selectedOption={selectedOption} changeOption={changeOption} />
        <OperationView selectedOption={selectedOption} expert={expert}/>
      </Box>
    </Container>
  );
};

export default Profile;
