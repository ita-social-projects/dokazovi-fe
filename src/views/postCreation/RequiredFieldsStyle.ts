import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() => ({
  requiredField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '27px',
    },
  },
  requiredAuthorField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '15px',
    },
  },
}));
