'use client'
import { search } from "@/actions";
import { Form, Input } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const searchParams =  useSearchParams()
  const [keyword, setKeyword] =  useState(searchParams.get('keyword') || '')
  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '')
  }, [searchParams])
  return (
    <div className="w-[200px] rounded-2xl flex justify-center items-center bg-gradient-to-tr from-gray-200  text-white">
    <Form action={search} className="w-full">
      <Input
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        isClearable
        onClear={() => setKeyword('')}
        classNames={{
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="输入关键词查询文章"
        radius="lg"
      />
    </Form>
  </div>
  )
}
