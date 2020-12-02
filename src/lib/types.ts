export enum ExpertStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
export enum PostStatus {
  DRAFT = 'DRAFT',
  MODERATION_FIRST_SIGN = 'MODERATION_FIRST_SIGN',
  MODERATION_SECOND_SIGN = 'MODERATION_SECOND_SIGN',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PostTypeEnum {
  ARTICLE = 'ARTICLE',
  DOPYS = 'DOPYS',
  VIDEO = 'VIDEO',
}

export enum DirectionEnum {
  CARDIOLOGY = 'CARDIOLOGY',
  PEDIATRICS = 'PEDIATRICS',
  THERAPY = 'THERAPY',
  COVID19 = 'COVID19',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  VIROLOGY = 'VIROLOGY',
  SURGERY = 'SURGERY',
}

export interface ICourse {
  photo?: string;
  courseType: CourseTypeEnum;
  direction: CourseEnum;
  title: string;
  createdAt: Date;
  course: boolean;
}

export enum CourseEnum {
  STUDY = 'STUDY',
}

export enum CourseTypeEnum {
  COURSE = 'COURSE',
}

export interface IPost {
  author?: IExpert;
  createdAt: string;
  direction: DirectionEnum;
  title: string;
  content?: string;
  status?: PostStatus;
  important?: boolean;
  tags?: string[];
  modifiedAt?: string;
  postType: PostTypeEnum;
  preview?: string;
}

export interface IExpert {
  avatar?: string;
  firstName: string;
  id?: number;
  lastName: string;
  mainInstitution?: {
    city: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  status?: ExpertStatus;
  direction?: DirectionEnum;
  email?: string;
  phone?: string;
  workPlace?: string;
  lastPost?: string;
}
