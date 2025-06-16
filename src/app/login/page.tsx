import { giteeSignIn, githubSignIn } from "@/actions/login";
import { Card, Image } from "@heroui/react";
export default function Page() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-[400px] px-4 py-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">登录</h1>
        <form action={githubSignIn}>
          <button className="w-full flex items-center justify-center gap-3 cursor-pointer border border-gray-300 rounded-md p-2 hover:bg-gray-200" type="submit">
            <Image
                alt="github logo"
                height={24}
                radius="full"
                src="/github.png"
                width={24}
              />
            <div>使用 GitHub 登录</div>
          </button>
        </form>
        <form action={giteeSignIn}>
          <button className="w-full flex items-center justify-center gap-3 cursor-pointer border border-gray-300 rounded-md p-2 hover:bg-gray-200" type="submit">
            <Image
                alt="github logo"
                height={24}
                radius="full"
                src="/gitee.png"
                width={24}
              />
            <div>使用 Gitee 登录</div>
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">其他登录方式暂未实现</p>
    </Card>
  </div>
  )
}