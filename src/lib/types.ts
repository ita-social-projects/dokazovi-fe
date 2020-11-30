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

export interface IPost {
  id?: number;
  title: string;
  content?: string;
  author?: IExpert;
  mainDirection: {
    id?: number;
    color: string;
    name: string;
    route?: string;
  };
  directions?: IPostDirection[];
  tags?: IPostTag[];
  postType: IPostType;
  createdAt: string;
  modifiedAt?: string;
  status?: PostStatus;
  important?: boolean;
  preview?: string;
}

export interface IExpert {
  id?: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  mainInstitution?: {
    city: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  status?: ExpertStatus;
  mainDirection?: {
    id?: number;
    color: string;
    name: string;
    route?: string;
  };
  workPlace?: string;
  lastPost?: string;
  email?: string;
  phone?: string;
}

export interface IPostDirection {
  id: number;
  name: string;
}

export interface IPostTag {
  id: number;
  tag: string;
}

export interface IPostType {
  name: string;
}
