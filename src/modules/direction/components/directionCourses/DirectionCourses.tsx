import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import BorderUp from '../../../../lib/components/Border';
import Carousel from '../../../../lib/components/Carousel';
import { CourseCard } from '../../../../lib/components/CourseCard';
import { RootStateType } from '../../../../store/rootReducer';
import { fetchCourses } from '../../store/directionSlice';

const DirectionCourses: React.FC = () => {
  const courses = useSelector((state: RootStateType) => state.direction.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div>
      <BorderUp />
      <Typography>Рекомендовані курси</Typography>
      <Carousel>
        {courses.map((p) => (
          <div key={p.title}>
            <CourseCard course={p} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DirectionCourses;
