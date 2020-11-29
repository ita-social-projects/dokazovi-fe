import {
  ICourse,
  CourseTypeEnum,
  CourseEnum,
} from '../../../lib/types';
import IMAGE from '../../../lib/images/study.png';

export const MOCK_COURSES: ICourse[] = [
  {
    photo: IMAGE,
    courseType: CourseTypeEnum.COURSE,
    direction: CourseEnum.STUDY,
    title: 'Lorem ipsum',
    createdAt: new Date(),
    course: true,
  }, 
  {
    photo: IMAGE,
    courseType: CourseTypeEnum.COURSE,
    direction: CourseEnum.STUDY,
    title: 'Lorem ipsum',
    createdAt: new Date(),
    course: true,
  }, 
  {
    photo: IMAGE,
    courseType: CourseTypeEnum.COURSE,
    direction: CourseEnum.STUDY,
    title: 'Lorem ipsum',
    createdAt: new Date(),
    course: true,
  }, 
  {
    photo: IMAGE,
    courseType: CourseTypeEnum.COURSE,
    direction: CourseEnum.STUDY,
    title: 'Lorem ipsum',
    createdAt: new Date(),
    course: true,
  }, 
  {
    photo: IMAGE,
    courseType: CourseTypeEnum.COURSE,
    direction: CourseEnum.STUDY,
    title: 'Lorem ipsum',
    createdAt: new Date(),
    course: true,
  }, 
];

