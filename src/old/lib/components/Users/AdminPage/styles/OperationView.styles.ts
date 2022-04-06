import { makeStyles, Theme } from '@material-ui/core';

// export const useStyles = makeStyles(
//   (theme: Theme) => ({
//     operationView: {
//       fontFamily: 'Raleway',
//       position: 'relative',
//       minHeight: '455px',
//       width: '1100px',
//       marginTop: theme.spacing(-8),
//       marginLeft: '210px',
//       padding: 0,
//       '& .adminInitialView': {
//         position: 'absolute',
//         top: '30%',
//         right: '30%',
//         '& .initialMessage': {
//           fontSize: '26px',
//           fontFamily: 'Raleway',
//           fontWeight: 500,
//         },
//       },
//       '& .menuPath': {
//         fontSize: '20px',
//         fontFamily: 'Raleway',
//         fontWeight: 500,
//         color: '#4f4f4f',
//       },
//       '& .menuTitle': {
//         fontSize: '20px',
//         fontFamily: 'Raleway',
//         fontWeight: 'bold',
//         borderBottom: '2px solid black',
//         marginTop: theme.spacing(2),
//       },
//     },
//   }),
//   { name: 'OperationView' },
// );

export const useStyles = makeStyles(
  (theme: Theme) => ({
    operationView: {
      fontFamily: 'Raleway',
      position: 'relative',
      minHeight: '455px',
      marginTop: theme.spacing(-8),
      paddingLeft: '210px',
      '& .adminInitialView': {
        position: 'absolute',
        top: '30%',
        right: '30%',
        '& .initialMessage': {
          fontSize: '26px',
          fontFamily: 'Raleway',
          fontWeight: 500,
        },
      },
      '& .menuPath': {
        fontSize: '20px',
        fontFamily: 'Raleway',
        fontWeight: 500,
        color: '#4f4f4f',
      },
      '& .menuTitle': {
        fontSize: '20px',
        fontFamily: 'Raleway',
        fontWeight: 'bold',
        borderBottom: '2px solid black',
        marginTop: theme.spacing(2),
      },
    },
  }),
  { name: 'OperationView' },
);

// import { makeStyles, Theme } from '@material-ui/core';

// export const useStyles = makeStyles(
//   (theme: Theme) => ({
//     sidemenuHeader: {
//       fontSize: '20px',
//       fontWeight: 500,
//       fontFamily: 'Raleway',
//       color: '#4f4f4f',
//       marginBottom: theme.spacing(2),
//     },
//     sidemenuBody: {
//       minWidth: '200px',
//       top: theme.spacing(24),
//       height: '100%',
//       paddingTop: theme.spacing(2),
//       backgroundColor: '#e5e5e5',
//       position: 'absolute',
//       border: 'none',
//     },
//     menuCategory: {
//       fontWeight: 'bold',
//       borderBottom: '2px solid black',
//       margin: '0 5%',
//       fontFamily: 'Raleway',
//       fontSize: '18px',
//     },
//   }),
//   { name: 'Sidemenu' },
// );
