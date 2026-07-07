'use client'
import { signOut, useSession } from "next-auth/react"

export default function Page() {
    const { data: session, status } = useSession()
    console.log(session?.accessToken, "tokennnn");


    return (
        <div className='text-text flex flex-col items-center gap-2.5'>
            <h1>Account</h1>
            <button className=" px-3 py-2.5 bg-red-700 text-white" onClick={() => signOut()}>Đăng xuất</button>
        </div>
    )
}
