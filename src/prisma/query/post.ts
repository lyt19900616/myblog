import { Post } from "@prisma/client";
import { prisma } from "..";

export type PostType = {
  author: {
    name: string | null;
    id: string;
    image: string | null;
  };
  categories: {
      name: string;
      id: string;
  }[];
  _count: {
      comments: number;
      likes: number;
  };
} & Post;

export const fetchAllPosts = (): Promise<PostType[]> => {
  return prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      categories: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  })
}
export const fetchPublicePosts = (): Promise<PostType[]> => {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      categories: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  })
}

export const getPostById = (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, image: true } },
      comments: {
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true, image: true } } }
      },
      likes: true,
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  });
};

export const fetchPostByKeyword = (keyword: string):  Promise<PostType[]> => {
  return prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
        { excerpt: { contains: keyword } },
      ],
    },
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      categories: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    }
  })
}