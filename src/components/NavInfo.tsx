'use client'

import { Avatar, Button, Form, Image, Popover, PopoverContent, PopoverTrigger, Spinner } from "@heroui/react"
import { useSession } from "next-auth/react"
import { allSignOut, giteeSignIn, githubSignIn } from "../actions"

export default function NavInfo() {
  const { data: session, status } = useSession()
  let statusContent: React.ReactNode
  if (status === "loading") {
    statusContent = <Spinner size="sm"/>
  } else if (session?.user) {
    statusContent = 
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <Avatar className="cursor-pointer" src={session.user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} />
      </PopoverTrigger>
      <PopoverContent className="px-4 py-6 flex flex-col gap-4">
        <Form action={allSignOut}>
          <Button className="border bg-white border-gray-300  hover:bg-gray-200" type="submit">
            登出
          </Button>
        </Form>
      </PopoverContent>
    </Popover>
  } else {
    statusContent = 
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <Button className="border bg-white border-gray-300  hover:bg-gray-200">登录</Button>
      </PopoverTrigger>
      <PopoverContent className="p-6 flex flex-col gap-4">
        <Form action={githubSignIn}>
          <Button className="w-50 border bg-white border-gray-300  hover:bg-gray-200" type="submit">
            <Image
                alt="github logo"
                height={24}
                radius="full"
                src="/github.png"
                width={24}
              />
            <div>使用 GitHub 登录</div>
          </Button>
        </Form>
        <Form action={giteeSignIn}>
          <Button className="w-50 border bg-white border-gray-300  hover:bg-gray-200" type="submit">
            <Image
                alt="github logo"
                height={24}
                radius="full"
                src="/gitee.png"
                width={24}
              />
            <div>使用 Gitee 登录</div>
          </Button>
        </Form>
        <p className="text-center text-gray-500 text-sm">其他登录方式暂未实现</p>
      </PopoverContent>
    </Popover>
  }
  return (statusContent)
}
