'use server'
import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { errorHandler } from "./errorHandler"
import { CommentType, ResultData } from "./type"


export const createComment = async (commentParams: CommentType, prevState: ResultData, formData: FormData): Promise<ResultData> => {
  const content = formData.get('content') as string

  try {
    // 可选：验证 userId 和 postId 是否存在
    const [user, post] = await Promise.all([
      prisma.user.findUnique({ where: { id: commentParams.userId } }),
      prisma.post.findUnique({ where: { id: commentParams.postId } })
    ])
    if (!user || !post) {
      return { success: false, errors: ['用户或文章不存在'] }
    }

    await prisma.comment.create({
      data: {
        content,
        postId: commentParams.postId,
        userId: commentParams.userId,
        ...(commentParams.parentId ? { parentId: commentParams.parentId } : {})
      }
    })

    revalidatePath(`/post/${commentParams.postId}`)
    return { success: true }
  } catch (error) {
    return errorHandler(error)
  }
}
