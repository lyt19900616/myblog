'use client'
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

type User = Session["user"] | null;
const UserContext = createContext<User>(null);

export const UserProvider = ({children,}: {children: React.ReactNode;}) => {
  const { data: session } = useSession();
  const user = session?.user || null;

  return <UserContext.Provider value={user} >{children}</UserContext.Provider>
};

export const useUser = () => useContext(UserContext);
