import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { compare } from "bcrypt";

export default NextAuth({
    providers: [
        CredentialsProvider({
            //id: "credentials",
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                await dbConnect();

                // Find user with the email
                const user = await User.findOne({
                    email: credentials.email,
                });

                //await db.disconnect();

                // Email Not found
                if (!user) {
                    throw new Error("Email is not registered");
                }

                // Check hased password with DB hashed password
                const isPasswordCorrect = await compare(
                    credentials.password,
                    user.password
                );

                // Incorrect password
                if (!isPasswordCorrect) {
                    throw new Error("Password is incorrect");
                }

                //return user;
                return {
                    _id: user._id,
                    name: user.name,
                    //email: user.email,
                    isAdmin: user.isAdmin,
                    //image: 'f',
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    // adapter: MongoDBAdapter(clientPromise),
    // session: {
    //     strategy: "jwt",
    // },
    // jwt: {
    //     secret: process.env.NEXTAUTH_JWT_SECRET,
    // },
    // secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
});
