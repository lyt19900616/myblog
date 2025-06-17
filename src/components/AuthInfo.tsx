import { auth } from "@/auth";
import { Image } from '@heroui/react';
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Image src={session.user.image || 'https://via.placeholder.com/150'} alt="User Avatar" />
    </div>
  )
}