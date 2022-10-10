import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  editButton: {
    padding: '0px 5px',
    color: 'green',
  },
  modifSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteButton: {
    padding: '0px 5px',
    color: 'red',
  },
  dialogSection: {
    outline: '4px solid red',
    maxWidth: '500px',
    boxShadow: '0px 6px 16px red',
  },
  dialogTitle: {
    '& .MuiTypography-h6': {
      textAlign: 'center',
      fontSize: 'larger',
    },
  },
  dialogFullname: {
    '& .MuiTypography-h6': {
      textAlign: 'center',
      fontSize: 'large',
    },
    paddingTop: '0px',
  },

  dialogContent: {
    padding: '0px 0px',
  },

  dialogContentText: {
    '& .MuiDialogContent-root': {
      padding: '0px 0px 0px 0px',
    },
    fontFamily: 'Raleway',
    color: 'black',
    textAlign: 'center',
  },

  dialogActions: {
    marginBottom: '10px',
    justifyContent: 'space-evenly',
  },

  dialogActionsButtons: {
    '&:active': {
      outlineColor: 'red',
    },
    rowGap: '100px',
    outline: 'medium solid #a7a7a7',
    borderRadius: '3px',
    width: '90px',
    boxShadow: '0px 3px 8px rgb(100,100,100)',
  },
}));
