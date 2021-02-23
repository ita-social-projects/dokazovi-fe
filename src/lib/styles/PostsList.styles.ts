import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { MAIN_THEME } from '../theme/theme';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      masonryGrid: {
        display: 'flex',
      },
      masonryColumn: {
        margin: `0 ${theme.spacing()}px`,
      },
      masonryItem: {
        marginBottom: theme.spacing(2),
      },
    }),
  { name: 'PostsList' },
);

export const MASONRY_BREAKPOINTS = {
  default: 3,
  [MAIN_THEME.breakpoints.values.md]: 2,
  [MAIN_THEME.breakpoints.values.sm]: 1,
};
