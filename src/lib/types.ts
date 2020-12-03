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
  mainInstitution?: IInstitution;
  mainDirection?: IDirection;
  lastAddedPost?: {
    id: number;
    title: string;
  };
  qualification?: string;
  phone?: string;
  email?: string;
  directions?: DirectionEnum;
  bio?: string;
  status?: ExpertStatus;
  direction?: DirectionEnum;
  workPlace?: string;
  lastPost?: string;
}

export interface IDirection {
  id?: number;
  color?: string;
  name: string;
  route?: string;
}

export interface IInstitution {
  city: {
    id?: number;
    name: string;
  };
  id?: number;
  name: string;
}
