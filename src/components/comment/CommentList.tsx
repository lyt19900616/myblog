import dayjs from "dayjs";

export function CommentList({ comments }: { postId: string, comments: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {comments.map(comment => (
        <div key={comment.id} className="border p-2 rounded">
          <p className="text-sm text-gray-600">{comment.author.name} · {dayjs(comment.createdAt).format('MM-DD')}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
