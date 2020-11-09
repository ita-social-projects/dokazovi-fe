export interface IPost {
    postId: number,
    authorId: number,
    directionId: number,
    typeId: number,
    title: string,
    content: string,
    status: PostStatus,
    important: boolean,
    tags: string,
    createdAt: Date,
    modifiedAt: Date
}

enum PostStatus {
    'draft',
    'moderation_first_sign',
    'moderation_second_sign',
    'published',
    'archived'
}

export interface IPostTag{
    postId: number,
    tagId: number
}

export interface IPostCategory {
    postId: number,
    categoryId: number
}

export interface IPostType{
    typeId: number,
    name: string
}

export interface IPostSource {
    postId: number,
    sourceId: number
}


