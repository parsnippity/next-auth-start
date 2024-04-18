import UserInfo from "@/components/UserInfo";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const authSession = await getServerAuthSession();
  console.log("test");
  console.log(authSession);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {authSession?.user && <UserInfo user={authSession?.user}/>}
      {!authSession?.user && (
        <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">Login</Link>
      )}
    </main>
  );
}