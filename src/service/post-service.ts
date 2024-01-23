import PostSchema from "@/models/Post";
import { PostI } from "@/types/post-type";
import { post } from "@/utils/axios";
import { useEffect, useState } from "react";

interface PaginationProps {
    search?: string;
    currentPage: number;
}

const usePostService = () => {

    const [datas, setDatas] = useState<PostI[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)


    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                const res = await post.get(`?skip=${skip}&limit=${limit}`)
                if (res.status === 200) {
                    const post = PostSchema.parse(res.data.posts);
                    setDatas(post);
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


    return { datas, isLoading, total, setSkip, setLimit, limit }
}

export { usePostService }