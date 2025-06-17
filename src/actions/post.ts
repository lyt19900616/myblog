'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { errorHandler } from "./errorHandler";
import { ResultData } from "./type";

export async function createPost(userId: string, prevState: ResultData, formData: FormData): Promise<ResultData> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  let excerpt = formData.get('excerpt') as string
  const published = (formData.get('published') as string) === '0' ? true : false
  const categoryIds = formData.getAll('categoryIds') as string[]
  
  const rawText = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  if (!excerpt) {
    excerpt = rawText.slice(0, 100); // 取前100字符
  }

  
  try {
    const validCategoryIds = categoryIds.filter(Boolean)

    await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        published,
        userId,
        ...(validCategoryIds.length > 0 && {
          categories: {
            connect: validCategoryIds.map(id => ({ id }))
          }
        })
      }
    })

  } catch (error) {
    return errorHandler(error)
  }
  revalidatePath('/')
  redirect('/')
  return { success: true }
}