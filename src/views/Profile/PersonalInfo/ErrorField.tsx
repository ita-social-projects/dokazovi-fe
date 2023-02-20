import React from 'react';
import { Box } from '@material-ui/core';

interface IErrorFieldProps {
  visitField: boolean;
  errorField: string;
}

export const ErrorField = ({
  visitField,
  errorField,
}: IErrorFieldProps): React.ReactElement => {
  const visibility = visitField && errorField ? 'visible' : 'hidden';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        m: 0,
        p: 0,
        height: '20px',
      }}
    >
      <Box
        component="span"
        sx={{
          visibility,
          my: 2,
          p: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
          color: 'red',
        }}
      >
        {errorField || ''}
      </Box>
    </Box>
  );
};
