'use client'

import { likePost } from "@/actions/like"
import { ThumbsUp } from "lucide-react"
import { useState, useTransition } from "react"

export default function LikeButton({ postId, count }: { postId: string, count: number }) {
  const [likes, setLikes] = useState(count)
  const [isPending, startTransition] = useTransition()
  const [liked, setLiked] = useState(false)

  const handleClick = () => {
    if (liked) return // 已点过赞
    startTransition(async () => {
      const res = await likePost(postId)
      if (res?.success) {
        setLikes((c) => c + 1)
        setLiked(true)
      } else {
        alert(res?.errors?.join(',') || '点赞失败')
      }
    })
  }
  return (
    <button
      onClick={handleClick}
      disabled={liked || isPending}
      className="flex items-center gap-1 text-gray-600 text-sm cursor-pointer hover:text-black"
    >
      <ThumbsUp size={16} className={liked ? 'text-red-500' : ''} />
      {likes}
    </button>
  )
}
