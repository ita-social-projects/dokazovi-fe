import { makeStyles, Theme } from '@material-ui/core';

interface IPostPreviewStyle {
  refineInputPadding: boolean;
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    postPreviewWrapper: {
      width: '49%',
      minWidth: '490px',
      position: 'relative',
      marginBottom: theme.spacing(4),
      padding: 0,
      '& .unclicable': {
        pointerEvents: 'none',
      },
    },
    iconButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      backgroundColor: '#fff',
      color: '#000',
      '&:hover': {
        backgroundColor: '#e3e3e3',
      },
    },
    orderNumberInput: (props: IPostPreviewStyle) => ({
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(1),
      paddingLeft: props.refineInputPadding ? '8px' : '11px',
      backgroundColor: '#fff',
      color: '#000',
      width: '30px',
      borderRadius: '50%',
      '& input::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '& input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '& input': {
        padding: '3px 0 7px',
      },
    }),
    cardHoverView: {
      zIndex: 2,
      backgroundColor: '#e3e3e3CC',
      position: 'absolute',
      width: '100%',
      height: '100%',
      paddingTop: '15%',
    },
    cardHoverButtons: {
      width: '30%',
      textAlign: 'center',
      margin: '0 auto 20px',
      color: '#1fbfa7',
      textDecoration: 'underline',
      fontStyle: 'italic',
      cursor: 'pointer',
      '&:hover': {
        color: '#22e3c6',
      },
    },
  }),
  { name: 'PostPreviewWrapper' },
);
