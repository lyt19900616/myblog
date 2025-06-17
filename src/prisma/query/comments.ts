import { Comment } from "@prisma/client";
import { cache } from "react";
import { prisma } from "..";

export type CommentWithAuthor = {
  author: {
      name: string | null;
      image: string | null;
  };
} & Comment;


export const fetchCommentsByPostId = cache((postId: string): Promise<CommentWithAuthor[]> => {
  return prisma.comment.findMany({
    where: {
      postId: postId
    },
    include: {
      author: {
        select: {
          name: true,
          image: true
        }
      }
    },
  })
})