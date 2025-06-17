import { auth } from "@/auth";
import CommentCreat from "@/components/comment/CommentCreat";
import { CommentList } from "@/components/comment/CommentList";
import LikeButton from "@/components/like/LikeButton";
import ContentShow from "@/components/post/ContentShow";
import { getPostById } from "@/prisma/query/post";
import { Card } from "@heroui/react";
import dayjs from "dayjs";
import { SessionProvider } from "next-auth/react";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }: {params: Promise<{ id: string }>}) {
  const session = await auth();
  const id = (await params).id;
  const post = await getPostById(id);

  if (!post) return notFound();

  const isOwner = post.userId === session?.user?.id;
  const canView = post.published || isOwner;

  if (!canView) return notFound();

  return (
    <div className="w-full px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {dayjs(post.updatedAt).format('YYYY年MM月DD日')} · 作者：{post.author.name}
        </p>
        <ContentShow content={post.content} />
        <div className="flex items-center gap-4 border-t pt-4">
          <LikeButton postId={post.id} count={post._count?.likes ?? 0} />
          <span>{post.likes.length} 人喜欢</span>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">评论 ({post.comments.length})</h2>
          <SessionProvider>
            <CommentCreat postId={post.id} />
          </SessionProvider>
          <CommentList postId={post.id} comments={post.comments} />
        </div>
      </Card>
    </div>
  );
}
