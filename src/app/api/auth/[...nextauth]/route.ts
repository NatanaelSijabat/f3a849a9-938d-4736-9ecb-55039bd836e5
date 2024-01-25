import { UserAuthSchema } from "@/models/User";
import { AuthI } from "@/types/user-type";
import { auth } from "@/utils/axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: "secret",
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as AuthI;

                const payload = {
                    username,
                    password
                };

                try {
                    const res = await auth.post('', payload, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    const userPass = UserAuthSchema.parse(res.data)
                    if (res.status === 200 && userPass) {
                        const user = await res.data
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log(error, 'err');
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, account, user }: any) {
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.sub = user.id;
                token.name = user?.username
                token.picture = user.image;

            }
            return Promise.resolve(token);
        },

        async session({ session, token }: any) {
            if (token.email) {
                session.user = {
                    ...session.user,
                    email: token.email,
                    id: token.sub,
                    image: token.picture,
                };
            }

            return Promise.resolve(session);
        },
    }, 
    pages: {
        error: '/login',
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions);

export {
    handler as GET, handler as POST
}
