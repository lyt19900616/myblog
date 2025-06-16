import { auth } from "@/auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <img src={session.user.image || 'https://via.placeholder.com/150'} alt="User Avatar" />
    </div>
  )
}