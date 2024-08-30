import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import axios from "axios";
import { APIBaseUrl } from "@/config/EnvConfig";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password, type } = credentials;

        try {
          let response;

          if (type === "user") {
            response = await axios.post(`${APIBaseUrl}/user/auth/signIn`, {
              email,
              password,
            });
          } else if (type === "admin") {
            response = await axios.post("df");
          } else {
            response = await axios.post("sdf");
          }

          return response.data.data;
        } catch (error: any) {
          const axiosError = error.response?.data.message;
          if (axiosError) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error("Internal server Error");
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ user, token, account }) {
      if (user) {
        (token.id = user.id),
          (token.email = user.email),
          //@ts-ignore
          (token.isVerified = user.isVerified),
          //@ts-ignore
          (token.gender = user.gender),
          //@ts-ignore
          (token.name = user.fullName);
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        //@ts-ignore
        (session.id = token.id),
          //@ts-ignore
          (session.email = token.email),
          //@ts-ignore
          (session.isVerified = token.isVerified),
          //@ts-ignore
          (session.gender = token.gender),
          //@ts-ignore
          (session.name = token.fullName);
      }

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
