import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() => ({
  requiredField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '25px',
    },
  },
}));
