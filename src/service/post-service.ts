import PostSchema from "@/models/Post";
import { PostI } from "@/types/post-type";
import { post } from "@/utils/axios";
import { useEffect, useState } from "react";

export type ApiParams = {
    [x: string]: any;
    skip: number;
    limit: number;
};

const usePostService = () => {
    const [datas, setDatas] = useState<PostI[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [search, setSearch] = useState<string | null>(null)


    const apiParam: ApiParams = {
        skip,
        limit
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                if (search !== null) {
                    apiParam.q = search

                    const res = await post.get('/search', {
                        params: apiParam
                    })

                    if (res.status === 200) {
                        const post = PostSchema.parse(res.data.posts);
                        setDatas(post);
                        setTotal(res.data.total)
                    }
                    setIsLoading(false)
                } else {
                    const res = await post.get('', {
                        params: apiParam
                    })
                    if (res.status === 200) {
                        const post = PostSchema.parse(res.data.posts);
                        setDatas(post);
                        setTotal(res.data.total)
                    }
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                return Promise.reject(error);
            }
        };

        console.log(search, 'cari')

        fetchApi()
    }, [skip, limit, search])


    return { datas, isLoading, total, setSkip, setLimit, setSearch }
}

export { usePostService }