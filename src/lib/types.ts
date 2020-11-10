export interface IExpert {
    status: ExpertStatus,
    firstName: string,
    secondName: string,
    email: string,
    phone: string,
}

enum ExpertStatus {
    NEW = 'NEW',
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

export interface IPost {
    direction: DirectionEnum,
    title: string,
    content: string,
    status: PostStatus,
    important: boolean,
    tags: string[],
    createdAt: Date,
    modifiedAt: Date,
    postType: PostTypeEnum,
    preview: string,
}

enum PostStatus {
    DRAFT = 'DRAFT',
    MODERATION_FIRST_SIGN = 'MODERATION_FIRST_SIGN',
    MODERATION_SECOND_SIGN = 'MODERATION_SECOND_SIGN',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

enum PostTypeEnum {
    DOPYS = 'DOPYS'
}

enum DirectionEnum {
    CARDIOLOGY = 'CARDIOLOGY',
    PEDIATRICS = 'PEDIATRICS'
}

