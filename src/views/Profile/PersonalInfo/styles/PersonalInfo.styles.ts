import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  
    (theme: Theme) => ({
      PersonalInfo: {
        // marginTop: theme.spacing(2),
        '& .BasicInput-basicInput' : {
            marginTop: '8px',
          },
        '& .MuiFormLabel-root':{
          fontFamily: 'Raleway',
          color: 'black',
          fontWeight: 600,
          fontSize: theme.spacing(3.6),
          // lineHeight: theme.spacing(4.4),
        },
      },
        Avatar: {
          height: 200,
          width: 200,
          marginright: 1000,
        },
        Contacts: {
          // margin: theme.spacing(1),
          
          '& .MuiInputBase-input': {
            marginTop: theme.spacing(2), // '8px auto'
            fontSize: theme.spacing(3.6),
            height: '1px',
          },
          
        },
        
        
      
    }),
  { name: 'PersonalInfo' },
);

