import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

interface ISecondTopSection {
  author: {
    firstName: string;
    id: number;
    lastName: string;
  };
}

export default function SecondTopSection({
  author,
}: ISecondTopSection): JSX.Element {
  const { id, firstName, lastName } = author;
  const authorFullName = `${firstName} ${lastName}`;
  return (
    <Box>
      <Link to={`/experts/${id}`}>
        <Typography variant="h4">{authorFullName}</Typography>
      </Link>
      <Typography variant="subtitle1" color="textSecondary">
        bio
      </Typography>
    </Box>
  );
}
