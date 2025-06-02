import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import ConnectDB from "@/libs/ConnectDB";
import Admin from "@/models/admin.models";
import User from "@/models/user.models";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await ConnectDB()
                try {
                    const admin = await Admin.findOne({
                        email: credentials.email
                    })
                    if (admin) {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, admin.password)
                        if (!isPasswordCorrect) {
                            throw new Error("Password is not correct")
                        }
                        else {
                            return {
                                id: admin._id.toString(),
                                name: admin.name,
                                email: admin.email,
                                role: admin.role,
                                avatar: admin.avatar
                            }
                        }
                    }
                    const user = await User.findOne({
                        email:credentials.email
                    })
                    if (!user) {
                        throw new Error("No user Found with this Email")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Password is not correct")
                    }
                    else {
                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            avatar: user.avatar
                        }
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ],
    pages: {
        signIn: "/pages/login",
        error: "/pages/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
                token.name = user.name
                token.avatar = user.avatar
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.role = token.role
                session.user.avatar = token.avatar
            }
            return session
        }

    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
}