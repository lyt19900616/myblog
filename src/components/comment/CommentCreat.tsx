'use client'
import { createComment } from "@/actions";
import { Button, Form, Spinner, Textarea } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

interface CommentProps {
  postId: string,
  isOpen?: boolean,
  parentId?: string
  isTop?: boolean
}
export default function CommentCreat({ postId, isOpen = false, parentId = '', isTop = true }: CommentProps ) {
  const router = useRouter();
  const { data: session, status} = useSession();
  const userId = session?.user?.id || ''
  const commentParams = {
    postId,
    parentId,
    userId
  }
  const [open, setOpen] = useState(isOpen)
  const [state, fromAction, isPending] = useActionState(
    createComment.bind(null,  commentParams), 
    {}
  )
  
  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/login");
    }
  }, [session, status, router])
  if (status === "loading" || !session?.user?.id) {
    return <Spinner size="sm"/>
  }
  return (
    <div>
      {!open && <Button onPress={() => setOpen(!open)}>{isTop ? '点击进行评论' : '回复'}</Button>}
      {
        open &&
        <Form className="w-full" action={fromAction}>
          <Textarea  
            name="content"
            placeholder="请输入评论内容"
            errorMessage={state.errors?.join(',')}
          />
          {state.errors &&
            <p className='w-full text-sm text-red-500'>{state.errors.join(',')}</p>
          }
          <div className="flex justify-end"><Button type="submit" isLoading={isPending}>发布评论</Button></div>
        </Form>
      }
    </div>
  )
}
