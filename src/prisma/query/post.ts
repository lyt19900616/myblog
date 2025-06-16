import { prisma } from ".."

export const fetchAllPosts = () => {
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
export const fetchPublicePosts = () => {
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
      author: { select: { name: true } },
      comments: {
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
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