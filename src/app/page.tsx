import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const authSession = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!authSession?.user ? (
        <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">Login</Link>
      ) : <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/profile">Profile</Link>}
    </main>
  );
}