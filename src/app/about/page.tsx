
import { Card } from '@heroui/react';

export default function AboutPage() {
  return (
    <div className="w-full p-6">
      <Card className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">关于本站</h1>
        <p>
          欢迎来到 <strong>我的博客</strong>！这是一个记录我在 Web 开发、技术探索、设计实践中所思所感的个人空间。
        </p>
        <p>
          这里你会看到关于前端开发、React、Next.js、TypeScript、Prisma、UI 设计等方面的内容。
          我希望通过分享自己的经验，能帮助到一些刚入行或正在迷茫中的开发者。
        </p>
        <h2 className="text-xl font-semibold">关于作者</h2>
        <p>
          我是一名前端开发工程师，对现代 Web 技术充满热情，喜欢开源、热爱编程，也关注用户体验和产品设计。
        </p>
        <h2 className="text-xl font-semibold">联系我</h2>
        <p>
          如果你有任何建议或想交流技术，可以通过以下方式联系我：
        </p>
        <ul className="list-disc list-inside">
          <li>邮箱：lyaoting205@gmail.com</li>
          <li>GitHub：<a href="https://github.com/lyt19900616/myblog" className="text-blue-600 hover:underline" target="_blank">lyt</a></li>
          <li>微博 / 推特 / 微信等</li>
        </ul>
      </Card>
    </div>
  );
}
