export interface IExpert {
  status?: ExpertStatus;
  firstName: string;
  secondName: string;
  direction?: DirectionEnum;
  email?: string;
  phone?: string;
  photo?: string;
  workPlace?: string;
  lastPost?: string;
}

export enum ExpertStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export interface IPost {
  author?: IExpert;
  direction: DirectionEnum;
  title: string;
  content: string;
  status?: PostStatus;
  important?: boolean;
  tags?: string[];
  createdAt: Date;
  modifiedAt?: Date;
  postType: PostTypeEnum;
  preview: string;
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

export interface ICourse {}
