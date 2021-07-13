import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import Sidemenu from './Sidemenu';
import OperationView from './OperationView';
import { IProfileMenuOption } from '../../old/lib/types';

const Profile: React.FC = () => {
  const [selectedOption, changeOption] = useState<
    IProfileMenuOption | Record<string, never>
  >({});

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
