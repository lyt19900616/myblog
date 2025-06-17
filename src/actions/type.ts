export type ResultData = {
  errors?: string[]
  success?: boolean
}

export type CommentType = {
  userId: string
  postId: string
  parentId?: string
}