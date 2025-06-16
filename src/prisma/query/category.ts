import { Category } from "@prisma/client";
import { prisma } from "..";

export type CategoryWithPostCount = {
  _count: {
      posts: number;
  };
} & Category;
export const fetchCategories = (): Promise<CategoryWithPostCount[]> => {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    }
  })
}