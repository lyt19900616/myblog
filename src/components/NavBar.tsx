'use client'
import {
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react"
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import NavInfo from "./NavInfo"
import ThemeButton from "./ThemeButton"

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function Page() {
  const menus = [
    { name: "首页", href: "/" },
    { name: "分类", href: "/category" },
    { name: "关于", href: "/about" }
  ]
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState(menus[0].name)
  const handleClick = (menu:{name: string, href: string}) => {
    setActiveMenu(menu.name)
    router.push(menu.href)
  }

  return (
    <Navbar className="shadow-md dark:shadow-amber-300">
      <NavbarBrand className="flex-1">
        <Link className="text-black" href="/">
        <AcmeLogo />
        <p className="text-2xl font-bold">博客系统</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="!flex-2 gap-4" justify="start">
        {menus.map((menu) => (
          <NavbarItem
            className="cursor-pointer"
            key={menu.name}
            onClick={handleClick.bind(null, menu)}
          >
            <span className={`px-3 py-2 rounded-md transition font-medium
                ${
                  activeMenu === menu.name
                    ? 'text-black text-2xl'
                    : 'text-gray-400 hover:text-black'
                }`}>{menu.name}</span>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="flex-1" justify="end">
        <Input />
      </NavbarContent>

      <NavbarContent className="flex-1" justify="center">
        <SessionProvider>
          <NavInfo />
        </SessionProvider>
        <ThemeButton />
      </NavbarContent>
    </Navbar>
  )
}
