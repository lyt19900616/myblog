import { useRouter } from "next/navigation";
import { useUser } from "./UserProvider";

export default function AuthCkeck() {
  const user = useUser();
  const router = useRouter();
  console.log(user);
  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      
    </div>
  )
}
