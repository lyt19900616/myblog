import { CommentWithAuthor } from "@/prisma/query/comments";
import CommentItem from "./CommentItem";

export function CommentList({ comments }: { postId: string, comments: CommentWithAuthor[] }) {
  const topLevelComments = comments.filter(comment => comment.parentId === null);
  return (
    <div>
      {
        topLevelComments.map((comment) => (
          <CommentItem  key={comment.id} comment={comment} />
        ))
      }
    </div>
  );
}
