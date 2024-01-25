import {  UsersSchema } from "@/models/User"
import {  UserI } from "@/types/user-type"
import {  user } from "@/utils/axios"
import { useEffect, useState } from "react"

const useUserService = () => {
    const [users, setUsers] = useState<UserI[]>([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await user.get('?limit=100');
                if (res.status === 200) {
                    const user = UsersSchema.parse(res.data.users);
                    setUsers(user);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        };

        fetchApi()
    }, [])

    return { users }
}


export { useUserService }