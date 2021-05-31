import { Box, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './TopSection.styles';

interface ITopSection {
  author: {
    avatar?: string;
    firstName: string;
    id: number;
    lastName: string;
    bio?: string;
  };
}

export default function TopSection({ author }: ITopSection): JSX.Element {
  const classes = useStyles();
  const { id, avatar = '', firstName, lastName, bio } = author;
  const authorFullName = `${firstName} ${lastName}`;
  return (
    <Box className={classes.authorBlock}>
      <Link to={`/experts/${id}`}>
        <CardMedia
          className={classes.avatar}
          image={avatar} // paste default avatar if not present
          title={authorFullName}
          component="div"
        />
      </Link>
      <Box>
        <Link to={`/experts/${id}`}>
          <Typography variant="h4">{authorFullName}</Typography>
        </Link>
        <Typography variant="subtitle1" color="textSecondary">
          {bio}
        </Typography>
      </Box>
    </Box>
  );
}
