import { auth } from '@/auth';
import { CommentList } from '@/components/comment/CommentList';
import LikeButton from '@/components/like/LikeButton';
import { getPostById } from '@/prisma/query/post';
import { Card } from '@heroui/react';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';


export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const post = await getPostById(params.id);

  if (!post) return notFound();

  const isOwner = post.userId === session?.user?.id;
  const canView = post.published || isOwner;

  if (!canView) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {dayjs(post.updatedAt).format('YYYY年MM月DD日')} · 作者：{post.author.name}
        </p>
        <div className="prose max-w-none mb-6 whitespace-pre-wrap">{post.content}</div>

        <div className="flex items-center gap-4 border-t pt-4">
          <LikeButton postId={post.id} count={post._count?.likes ?? 0}/>
          <span>{post.likes.length} 人喜欢</span>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">评论 ({post.comments.length})</h2>
          <CommentList postId={post.id} comments={post.comments} />
        </div>
      </Card>
    </div>
  );
}
