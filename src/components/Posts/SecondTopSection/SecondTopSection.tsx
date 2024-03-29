import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './SecondTopSection.styles';

export interface ISecondTopSection {
  author: {
    firstName: string;
    id: number;
    lastName: string;
    bio?: string;
  };
  origin?: number;
}

export default function SecondTopSection({
  author,
  origin,
}: ISecondTopSection): JSX.Element {
  const classes = useStyles();
  const { id, firstName, lastName, bio } = author;
  const authorFullName = `${firstName} ${lastName}`;
  return (
    <Box className={classes.root} data-testid="block">
      {origin !== 3 ? (
        <>
          <Link to={`/experts/${id}`} data-testid="link">
            <Typography variant="h4" className={classes.authorName}>
              {authorFullName}
            </Typography>
          </Link>
          <Typography
            color="textSecondary"
            className={classes.authorBio}
            data-testid="typography"
          >
            {bio}
          </Typography>
        </>
      ) : (
        <>
          <Link to="/materials?origins=3">
            <Typography variant="h4" className={classes.authorName}>
              {authorFullName}
            </Typography>
            <Typography color="textSecondary" className={classes.authorBio}>
              {bio}
            </Typography>
          </Link>
        </>
      )}
    </Box>
  );
}
