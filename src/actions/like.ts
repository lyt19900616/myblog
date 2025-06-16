'use server'

import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "../auth"
import { prisma } from "../prisma"
import { errorHandler } from "./errorHandler"
import { ResultData } from "./type"

export async function likePost(postId: string): Promise<ResultData> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    redirect('/login')
  }
  try {
    await prisma.like.create({
      data: {
        userId: userId as string,
        postId: postId as string,
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { errors: ["您已点过赞了"] }
      }
    }
    return errorHandler(error)
  }
  revalidatePath('/')
  return { success: true }
}