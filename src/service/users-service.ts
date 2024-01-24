import { UserSchema, UsersSchema } from "@/models/User"
import { AuthI, UserI } from "@/types/user-type"
import { auth, user } from "@/utils/axios"
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

const useAuthService = () => {
    const [user, setUser] = useState<UserI>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState<string | null>(null);

    const doLogin = async (payload: AuthI) => {
        setIsLoading(true)
        await auth.post('', payload, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.status === 200) {
                const userPass = UserSchema.parse(res.data);
                setUser(userPass);
                setMsg(null)
            }
        }).catch((error) => {
            if (error.response?.status === 400) {
                setMsg(error.response?.data?.message);
            }
        }).finally(()=>{
            setIsLoading(false)
        });
    };

    return { user, isLoading, doLogin, msg }
}

export { useUserService, useAuthService }