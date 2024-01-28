import { comment } from "@/utils/axios"
import { useEffect, useState } from "react"
import { ApiParams } from "./post-service"
import { CommentSchema } from "@/models/Comment"
import { CommentI } from "@/types/commeny-type"

const useCommentService = () => {
    const [comments, setComments] = useState<CommentI[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const apiParam: ApiParams = {
        skip,
        limit
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                const res = await comment.get('', { params: apiParam });
                if (res.status === 200) {
                    const comment = CommentSchema.parse(res.data.comments);
                    setComments(comment);
                    setTotal(res.data.total)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                return Promise.reject(error);
            }
        };

        fetchApi()
    }, [skip, limit])

    return { comments, isLoading, total, setSkip, setLimit }
}

const useAllCommentService = () => {
    const [comments, setComments] = useState<CommentI[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(0)

    const apiParam: ApiParams = {
        skip,
        limit
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                const res = await comment.get('', { params: apiParam });
                if (res.status === 200) {
                    const comment = CommentSchema.parse(res.data.comments);
                    setComments(comment);
                    setTotal(res.data.total)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                return Promise.reject(error);
            }
        };

        fetchApi()
    }, [skip, limit])

    return { comments, isLoading, total }
}

const useCommentByPostIdService = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentI[]>([])
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)


    const apiParam: ApiParams = {
        skip,
        limit
    }

    const getCommentByPostId = async (postId?: number) => {
        try {
            setIsLoading(true)
            const res = await comment.get(`post/${postId}`, { params: apiParam });
            if (res.status === 200) {
                const comment = CommentSchema.parse(res.data.comments);
                setComments(comment);
                setTotal(res.data.total)
                setIsLoading(false)
                return res.data.total
            }
        } catch (error) {
            setIsLoading(false)
            return Promise.reject(error);
        }
        return 0
    };

    return { comments, isLoading, total, getCommentByPostId }
}

export { useCommentService, useCommentByPostIdService, useAllCommentService }