export interface PostI {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[]
    reactions: number
}

export interface CardPostI {
    data: PostI[],
    isLoading: boolean
    total: number
    setSkip: (val: number) => void
    setLimit: (val: number) => void
    limit: number
}