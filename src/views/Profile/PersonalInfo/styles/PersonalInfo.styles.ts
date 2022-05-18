import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  
    (theme: Theme) => ({
      PersonalInfo: {
        // marginTop: theme.spacing(2),
          '& .MuiFormControl-root' : {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
          },
          '& .MuiInputBase-input': {
            // padding: theme.spacing(4)
          },
        '& .MuiFormLabel-root':{
          fontFamily: 'Raleway',
          color: 'black',
          fontWeight: 600,
          fontSize: theme.spacing(3.6),
          // lineHeight: theme.spacing(4.4),
        },
        
      },
        AvatarContainer: {
          display: "inline-flex",
          position: "relative",
          padding: 0,
        },
        Icon: {
          right: 0,
          bottom: 0,
          position: "absolute",
          padding: 0,
        },
        Avatar: {
          height: 225,
          width: 225,
          // marginright: 100,
        },
        Contacts: {
          // margin: theme.spacing(1),
          
          '& .MuiInputBase-input': {
            padding: '10px',
            // marginTop: theme.spacing(1), // '8px auto'
            fontSize: theme.spacing(3),
            height: theme.spacing(4),
          },
          
        },
        
        
      
    }),
  { name: 'PersonalInfo' },
);

