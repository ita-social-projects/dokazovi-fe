export interface IExpert {
    status: ExpertStatus,
    firstName: string,
    secondName: string,
    role: IExpertRole,
}

enum ExpertStatus {
    NEW = 'NEW',
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

interface IExpertRole {
    roleId: number,
    userId: number
}

export interface IPost {
    postId: number,
    authorId: number,
    directionId: number,
    direction: DirectionEnum,
    typeId: string,
    title: string,
    content: string,
    status: PostStatus,
    important: boolean,
    tags: string[],
    createdAt: Date,
    modifiedAt: Date,
    postType: PostTypeEnum,
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

