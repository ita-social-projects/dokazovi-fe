import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    desktopImagesContainer: {
      margin: '15px auto 0',
    },
    desktopImagesDetails: {
      margin: '15px 0 0',
      padding: '0',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      '& .postPreview:nth-child(even)': {
        marginLeft: theme.spacing(2),
      },
      '& .postPreview:nth-child(odd)': {
        marginRight: theme.spacing(2),
      },
    },

    desktopImagesAccordion: {
      backgroundColor: '#e5e5e5',
      '&::before': {
        height: 0,
      },
      '& .sectionDetails': {
        flexDirection: 'column',
      },
    },
    desktopImagesHeader: {
      border: '1px solid #000',
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
  }),
  { name: 'DesktopImagesWrapper' },
);
