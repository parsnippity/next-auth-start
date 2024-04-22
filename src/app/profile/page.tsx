import React from 'react'
import { getServerAuthSession } from "@/server/auth";
import UserInfo from '@/components/UserInfo';
import { redirect } from 'next/navigation';

const page = async () => {
  const authSession = await getServerAuthSession();
  if(!authSession?.user) {
    redirect("/login")
  }
  return (
    <div>
        {authSession?.user && <UserInfo user={authSession?.user}/>}
    </div>
  )
}

export default page;