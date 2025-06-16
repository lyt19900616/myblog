import NextAuth from "next-auth";
import authConfig from "./auth.config";
 
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({session, token}) {
      session.user.id = token.id as string
      return session
    }
  }
})