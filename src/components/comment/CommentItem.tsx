import { CommentWithAuthor, fetchCommentsByPostId } from "@/prisma/query/comments";
import { Avatar } from "@heroui/react";
import dayjs from "dayjs";
import CommentCreat from "./CommentCreat";

export default async function CommentItem({ comment }: { comment: CommentWithAuthor }) {
  const subComments = await fetchCommentsByPostId(comment.postId);
  return (
    <div className='border-b border-gray-200 p-4 dark:border-amber-300'>
      <div className="flex gap-3">
        <Avatar size="md"  src={comment.author.image || "https://i.pravatar.cc/150?u=a042581f4e29026024d"} />
        <div className="flex-1 flex flex-col gap-1 justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-100 font-medium">{comment.author.name}</p>
          <p className="flex justify-between items-center-safe">
            <span className="flex-1 text-gray-800 dark:text-gray-100">{comment.content}</span>
            <span className="text-sm text-gray-400 w-[150px] text-right dark:text-gray-100">{dayjs(comment.createdAt).format('YYYY年MM月DD日')}</span>
          </p>
            <CommentCreat postId={comment.postId} parentId={comment.id} isTop={false}/>
        </div>
      </div>
      {
        subComments.length > 0 && 
        <div className="pl-8">
          {subComments.filter((item) => item.parentId === comment.id).map(
            (subitem) => (<CommentItem key={subitem.id} comment={subitem} />)
          )}
        </div>
      }
    </div>
  )
}
