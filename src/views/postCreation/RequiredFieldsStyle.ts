import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles(() => ({
  requiredField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '27px',
    },
  },
  requiredAuthorField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '15px',
    },
  },
  carouselImagesContainer: {
    display: 'flex',
  },
  carouselImageWrapper: {
    flexBasis: '33%',
    marginRight: '10px',
  },
  backgroundImagesContainer: {
    display: 'flex',
  },
  backgroundImageWrapper: {
    flexBasis: '33%',
  },
  imageSizeText: {
    fontStyle: 'normal',
    fontFamily: 'sans-serif',
    paddingLeft: '10px',
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '20px',
    },
  },
}));
