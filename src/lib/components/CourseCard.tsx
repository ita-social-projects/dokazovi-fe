import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Chip } from '@material-ui/core';
import { useStyles } from '../styles/CourseCard.styles';
import { ICourse } from '../types';

export interface ICourseCardProps {
  course: ICourse;
}

export const CourseCard: React.FC<ICourseCardProps> = (props) => {
  const classes = useStyles();
  const { course } = props;
  const courseDate = `${course.createdAt.split('T')[0]}`;
  return (
    <Card className={classes.root}>
      <Box className={classes.leftPart}>
        <CardMedia
          className={classes.photo}
          image={course.photo}
          title="course"
        />
      </Box>
      <Box className={classes.rightPart}>
        <Box className={classes.chipRoot}>
          <Chip label={course.courseType} size="small" />
          <Chip label={course.direction} size="small" />
        </Box>
        <Typography variant="body1" component="p" align="center">
          {course.title}
        </Typography>
        <Typography
          style={{ fontStyle: 'italic' }}
          align="right"
          variant="body2"
          className={classes.createdAt}
        >
          {courseDate}
        </Typography>
      </Box>
    </Card>
  );
};
