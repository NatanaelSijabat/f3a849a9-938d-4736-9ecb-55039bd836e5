import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as any

                const header = {
                    "Content-Type": "application/json",
                }

                const body = {
                    username,
                    password
                }

                try {
                    const res = await axios.post(`https://dummyjson.com/auth/login`, body)
                    const user = res.data

                    if (res.status === 200) {
                        return user
                    } else {
                        throw new Error(`${res.data.message}`)
                    }
                } catch (error: any) {
                    throw new Error(error.response.data.message);
                }
            },
        })
    ]
}