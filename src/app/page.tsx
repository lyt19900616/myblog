import { auth } from '@/auth';
import LikeButton from '@/components/like/LikeButton';
import { fetchAllPosts, fetchPublicePosts } from '@/prisma/query/post';
import { Card, Link } from '@heroui/react';
import dayjs from 'dayjs';
import { MessageCircle } from 'lucide-react';

export default async function page() {
  const session = await auth()
  const posts = session?.user?.id
    ? await fetchAllPosts()
    : await fetchPublicePosts()
  
  return (
    <div>
      <section className='flex flex-col items-center justify-center gap-3 py-6'>
        <h1 className='text-2xl font-bold'>我的博客</h1>
        <p className=' text-gray-500 dark:text-gray-200'>分享关于 Web 开发、设计和技术的见解</p>
        <Link className='bg-black text-white px-4 py-2 rounded-md dark:bg-white dark:text-black'  href='/post'>创建新文章</Link>
      </section>
      <section>
        <h1 className='text-xl font-bold p-2'>最新文章</h1>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {
            posts.map((post) => (
              <Card className="p-4 flex flex-col gap-4 justify-between" key={post.id}>
                <p className='text-gray-500 text-sm'>{dayjs(post.updatedAt).format('YYYY年MM月DD日')} · {post.author.name}</p>
                <Link href={`/post/${post.id}`} className='text-xl font-bold text-black dark:text-white'>{post.title}</Link>
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
      </section>
    </div>
  )
}
