export interface CommentI {
    id: number,
    body: string,
    postId: number,
    user: {
        id: number,
        username: string
    }
}

export interface CardCommentI {
    data: CommentI[],
    isLoading: boolean
    total: number
    setSkip: (val: number) => void
    setLimit: (val: number) => void
}

export interface AddCommentI {
    body: string,
    postId: number,
    userId: number,
}