import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    adminImportantSection: {
      minHeight: '200px',
      margin: '15px auto 0',
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
    primaryButtons: {
      width: '200px',
      backgroundColor: '#000',
      borderRadius: '20px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      '& span[class$="label"]': {
        color: '#fff',
      },
    },
    primaryButtonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      // paddingRight: '5%',
      marginBottom: theme.spacing(4),
    },
    centeredElement: {
      margin: '0 auto',
    },
    importantPreviewModal: {
      padding: '50px',
      justifyContent: 'center',
    },
    addMaterialsSection: {
      backgroundColor: '#e5e5e5',
      '&::before': {
        height: 0,
      },
      '& .sectionDetails': {
        flexDirection: 'column',
        padding: theme.spacing(1, 0, 0),
      },
    },
    addMaterialsHeader: {
      border: '1px solid #000',
    },
    addMaterialsBody: {
      margin: theme.spacing(3, 0, 0),
      minHeight: 'auto',
    },
  }),
  { name: 'ImportantView' },
);
