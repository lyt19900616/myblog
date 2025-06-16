'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { errorHandler } from "./errorHandler";
import { ResultData } from "./type";

export async function createPost(userId: string, prevState: ResultData, formData: FormData): Promise<ResultData> {
  const title = formData.get('title')
  const content = formData.get('content')
  const excerpt = formData.get('excerpt')
  const published = (formData.get('published') as string) === '0' ? true : false
  const categoryIds = formData.getAll('categoryIds') as string[]
  console.log(formData);
  
  try {
    await prisma.post.create({
      data: {
        title: title as string,
        content: content as string,
        excerpt: excerpt as string,
        published: published,
        userId: userId as string,
        categories: {
          connect: categoryIds.map(id => ({ id }))
        }
      }
    })
  } catch (error) {
    return errorHandler(error)
  }
  revalidatePath('/')
  redirect('/')
  return { success: true }
}