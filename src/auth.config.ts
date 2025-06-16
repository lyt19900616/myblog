import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Gitee from "./gitee"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub, Gitee],
} satisfies NextAuthConfig