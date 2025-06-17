'use server'
import { redirect } from "next/navigation";


export const search = async (fromData: FormData) => {
  const keyword = fromData.get('keyword') as string;
  if (typeof keyword !== 'string' || !keyword) {
    redirect('/')
  }
  redirect(`/search?keyword=${keyword}`)
}