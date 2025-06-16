'use client'
import { createPost } from "@/actions";
import { CategoryWithPostCount } from "@/prisma/query/category";
import { Button, Card, Checkbox, CheckboxGroup, Form, Input, Radio, RadioGroup, Spinner, Textarea } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Page({ categories }: { categories: CategoryWithPostCount[] }) {
  const router = useRouter();
  const { data: session, status} = useSession();
  const userId = session?.user?.id || ''
  const [state, fromAction, isPending] = useActionState(
    createPost.bind(null,  userId), 
    {}
  )
  
  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/login");
    }
  }, [session, router])
  if (status === "loading" || !session?.user?.id) {
    return <Spinner size="sm"/>
  }

  return (
    <Card className="w-3/4 mx-auto mt-4 p-4">
      <h1 className="text-xl font-bold">创建新文章</h1>
      <Form
        className="w-full flex flex-col gap-4 py-4"
        action={fromAction}
      >
        <Input
          isRequired
          errorMessage="请输入有效的文章标题"
          label="标题"
          labelPlacement="outside"
          name="title"
          placeholder="输入文章标题"
          type="text"
          maxLength={30}
        />

        <Input
          errorMessage="请输入有效的摘要"
          label="摘要"
          labelPlacement="outside"
          name="excerpt"
          placeholder="输入文章的摘要"
          type="text"
        />
        <Textarea
          isRequired
          label="内容"
          labelPlacement="outside"
          placeholder="编写文章内容"
          name="content" 
          disableAnimation
          disableAutosize
          classNames={{
            input: "resize-y min-h-[80px]",
          }}/>
        <CheckboxGroup label="分类" name="categoryIds" color="default">
          {
            categories.map((category) => {
              return <Checkbox key={category.id} value={category.id}>{category.name}</Checkbox>
            })
          }
        </CheckboxGroup>
        <RadioGroup label="可见性" name="published" defaultValue="0" color="default">
          <Radio value="1">私有-仅登录用户可见</Radio>
          <Radio value="0">公开-所有人可见</Radio>
        </RadioGroup>
        {state.errors &&
          <p className='w-full text-sm text-red-500'>{state.errors.join(',')}</p>
        }
        <div className="w-full flex align-center justify-between">
          <Button variant="flat" type="reset">取消</Button>
          <Button className="bg-black text-white" isLoading={isPending} type="submit">发布</Button>
        </div>
      </Form>
    </Card>
  )
}
