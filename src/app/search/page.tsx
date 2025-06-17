
import LikeButton from "@/components/like/LikeButton"
import { fetchPostByKeyword, PostType } from "@/prisma/query/post"
import { Card, Link } from "@heroui/react"
import dayjs from "dayjs"
import { MessageCircle } from "lucide-react"
import { redirect } from "next/navigation"

interface PageProps {
  searchParams: { keyword: string };
}
export default async function Page({ searchParams }: PageProps) {
  const { keyword } =  searchParams
  const posts =  await fetchPostByKeyword(keyword)
  if (!keyword) {
    redirect('/')
  }
  if (posts.length === 0) {
    return <div>没有找到相关内容</div>
  }
  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
      {
        posts.map((post: PostType) => (
          <Card className="p-4 flex flex-col gap-4 justify-between" key={post.id}>
            <p className='text-gray-500 text-sm'>{dayjs(post.updatedAt).format('YYYY年MM月DD日')} · {post.author.name}</p>
            <Link href={`/post/${post.id}`} className='text-xl font-bold text-black'>{post.title}</Link>
            <p className='line-clamp-3'>{post.excerpt || post.content}</p>
            <Link className='w-full flex items-center justify-center text-gray-600 border border-gray-400 px-4 py-2 rounded-md cursor-pointer' href={`/post/${post.id}`}>阅读全文</Link>
            <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MessageCircle size={16} /> {post._count?.comments ?? 0}
              </div>
              <LikeButton postId={post.id} count={post._count?.likes ?? 0} />
            </div>
          </Card>
        ))
      }
    </div>
  )
}
