import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      masonryGrid: {
        display: 'flex',
      },
      masonryColumn: {
        marginRight: theme.spacing(2),
        '&:last-of-type': {
          margin: 0,
        },
      },
      masonryItem: {
        marginBottom: theme.spacing(2),
      },
    }),
  { name: 'PostsList' },
);

export const MASONRY_BREAKPOINTS = {
  default: 4,
  '900': 3,
  '700': 2,
};
