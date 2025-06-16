
import PostAdd from "@/components/post/PostAdd";
import { fetchCategories } from "@/prisma/query/category";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <SessionProvider>
      <PostAdd categories={categories}/>
    </SessionProvider>
  )
}
