'use server'

import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { errorHandler } from "./errorHandler"
import { ResultData } from "./type"

export const createCategory = async (prevState: ResultData, formData: FormData): Promise<ResultData> => {
  const name = formData.get('name')
  const description = formData.get('description')
  try {
    await prisma.category.create({
      data: {
        name: name as string,
        description: description as string
      }
    })
  } catch (error) {
    return errorHandler(error)
  }
  revalidatePath('/category')
  return{ success: true }
}