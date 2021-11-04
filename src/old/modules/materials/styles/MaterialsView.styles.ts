import { makeStyles, Theme } from '@material-ui/core';

export interface IStyleProps {
  pageYOffset: number;
}

const top = 20;

export const useStyles = makeStyles<Theme, IStyleProps>(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '7px 0px 15px 0px',
      justifyContent: 'flex-start',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
        width: '228px',
        height: '48px',
      },
    },
    title: {
      width: '100%',
      margin: '0 0 28px 0',
      fontSize: '28px',
      lineHeight: '28px',
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.light,
    },
    selectedFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.4',
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'nowrap',
      },
    },
    totalFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.29',
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'nowrap',
        lineHeight: '1.4',
        marginBottom: '18px',
      },
    },
    divider: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '1.4',
    },
    gridSpacing: {
      paddingLeft: '20px',
    },
    scrollabelContainer: {
      position: 'sticky',
      top: 80 + top,
      overflowY: 'hidden',
      maxHeight: ({ pageYOffset }) =>
        `calc(100vh + ${
          pageYOffset < 80 + top ? pageYOffset - 80 - top : 0
        }px )`,
      padding: '0px 15px 100px 0px',
      margin: 0,
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 2,
        backgroundColor: theme.palette.primary.main,
      },
      '&:hover': {
        overflowY: 'scroll',
      },
    },
    headerContainer: {
      margin: 0,
      position: 'sticky',
      top: top - 1,
      zIndex: 1,
    },
    selectedFiltersWraper: {
      backgroundColor: theme.palette.primary.light,
      width: 'calc(100% + 20px)',
    },
    emptyDiv: {
      zIndex: 1,
      position: 'sticky',
      top: -1,
      width: 'calc(100% + 20px)',
      backgroundColor: theme.palette.primary.light,
      height: ({ pageYOffset }) => (pageYOffset < top ? pageYOffset : top),
    },
  }),
  {
    name: 'MaterialsView',
  },
);
