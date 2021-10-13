import { Box, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './TopSection.styles';

export interface ITopSection {
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
    <Box className={classes.root}>
      <Box className={classes.avatarSection} data-testid="avatarSection">
        <Link to={`/experts/${id}`}>
          <CardMedia
            className={classes.avatar}
            image={avatar} // paste default avatar if not present
            title={authorFullName}
            component="div"
          />
        </Link>
      </Box>
      <Box data-testid="infoAuthor">
        <Link to={`/experts/${id}`}>
          <Typography variant="h3" className={classes.authorName}>
            {authorFullName}
          </Typography>
        </Link>
        <Typography color="textSecondary" className={classes.authorBio}>
          {bio}
        </Typography>
      </Box>
    </Box>
  );
}
