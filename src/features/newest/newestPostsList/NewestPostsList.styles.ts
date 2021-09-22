import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        marginTop: theme.spacing(10),
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        marginBottom: theme.spacing(4),
        cursor: 'pointer',
      },
      postsType: {
        color: theme.palette.text.secondary,
      },
      line: {
        borderBottom: '1px solid #ccc',
        flexBasis: 1,
        flexGrow: 2,
        position: 'relative',
        bottom: '8px',
      },
      arrow: {
        display: 'flex',
        '& span': {
          width: '6px',
          height: '6px',
          border: 'solid #2F80ED',
          borderWidth: '1.5px 0 0 1.5px',
          transform: 'rotate(135deg) translate(3px, 1px)',
          transformOrigin: 'bottom',
        },
      },
      grid: {
        minHeight: '315px',
      },
      post: {
        '&:last-child': {
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
          [theme.breakpoints.down('sm')]: {
            display: 'block !important',
          },
        },
      },
    }),
  { name: 'NewestPostsList' },
);
