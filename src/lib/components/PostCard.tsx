import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Chip } from '@material-ui/core';
import { MOCK_DATA, MOCK_DATA_USER } from '../constants/postCard-config';
import { useStyles } from '../styles/PostCard.styles';

export interface IPostCardProps {
  mockData: typeof MOCK_DATA;
  mockDataUser: typeof MOCK_DATA_USER;
}

export const PostCard: React.FC<IPostCardProps> = (props) => {
  const classes = useStyles();
  const { mockData, mockDataUser } = props;
  return (
    <Card className={classes.root}>
      <Box className={classes.leftPart}>
        <CardMedia
          className={classes.photo}
          image={mockDataUser.photo}
          title="doctor"
        />
        <Typography
          className={classes.fullName}
          component="p"
          variant="subtitle2"
          gutterBottom
          align="center"
        >
          {mockDataUser.firstName} {mockDataUser.secondName}
        </Typography>
        <Typography component="p" variant="body2" gutterBottom align="center">
          {mockDataUser.workPlace}
        </Typography>
      </Box>
      <Box className={classes.rightPart}>
        <Box className={classes.chipRoot}>
          <Chip label={mockData.postType} size="small" />
          <Chip label={mockData.direction} size="small" color="secondary" />
        </Box>
        <Typography variant="body1" component="p" align="center">
          {mockData.preview}
        </Typography>
      </Box>
    </Card>
  );
};
