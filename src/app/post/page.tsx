
import PostAdd from "@/components/post/PostAdd";
import { fetchCategories } from "@/prisma/query/category";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <PostAdd categories={categories}/>
  )
}
