import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { mockData } from '../constants/postCard-config';

const useStyles = makeStyles(
  {
    root: {
      minWidth: 400,
      height: 190,
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 20px',
    },
    leftPart: {
      border: '1px solid black',
      backgroundColor: '#8a918c',
      width: 150,
      height: 170,
    },
    photo: {
      width: 80,
      height: 80,
      margin: '10px auto',
      border: '1px solid black',
    },
    fullName: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    rightPart: {
      border: '1px solid black',
      width: 250,
      height: 170,
    },
    chipRoot: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 5,
      marginBottom: 50,
    },
  },
  { name: 'PostCard' },
);

export const PostCard: React.FC = () => {
  const classes = useStyles();
  const { ...data } = mockData;
  return (
    <Card className={classes.root}>
      <Box className={classes.leftPart}>
        <CardMedia className={classes.photo} image="image" title="doctor" />
        <Typography
          className={classes.fullName}
          component="p"
          variant="subtitle2"
          gutterBottom
          align="center"
        >
          Павлов Іван
        </Typography>
        <Typography component="p" variant="body2" gutterBottom align="center">
          Київ, КМКЛ №17
        </Typography>
      </Box>
      <Box className={classes.rightPart}>
        <Box className={classes.chipRoot}>
          <Chip label={data.postType} size="small" />
          <Chip label={data.direction} size="small" color="secondary" />
        </Box>
        <Typography variant="body1" component="p" align="center">
          {data.preview}
        </Typography>
      </Box>
    </Card>
  );
};
