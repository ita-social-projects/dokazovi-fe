import React from 'react';
import { Box } from '@material-ui/core';

interface IErrorFieldProps {
  visitField: boolean;
  errorField: string;
}

export const ErrorField = ({ visitField, errorField }: IErrorFieldProps) => {
  const visibility = visitField && errorField ? 'visible' : 'hidden';
  return (
    <Box
      component="span"
      sx={{
        visibility,
        my: 2,
        p: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
    >
      {errorField || 'hidden'}
    </Box>
  );
};
