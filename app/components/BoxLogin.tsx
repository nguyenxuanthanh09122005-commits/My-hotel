'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import LoginModal from './LoginModal'
import Link from 'next/link'

export default function BoxLogin() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    console.log(session, "seee");

    const user = session?.user

    return (
        <>
            <div className="flex justify-center items-center font-poppins">
                {status === 'authenticated' && user ? (
                    /* User Profile Dropdown */

                    <Link href="/account" className="relative group flex items-center gap-3 py-2 cursor-pointer w-full z-50">
                        {/* Avatar */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200/80 shadow-sm transition-transform duration-300 group-hover:scale-105">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'User avatar'}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-text text-white flex items-center justify-center font-extrabold text-sm uppercase">
                                    {user.name ? user.name.charAt(0) : 'U'}
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:flex items-center gap-1.5 select-none">
                            <span className="font-semibold text-text text-sm md:text-[15px] whitespace-nowrap">
                                {user.name}
                            </span>

                        </div>


                    </Link>

                ) : (
                    /* Login Trigger Button */
                    <button
                        onClick={openModal}
                        className="border border-text text-text hover:bg-text hover:text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-[36px] lg:py-[16px] text-sm md:text-base transition-all rounded font-medium duration-200 cursor-pointer"
                    >
                        Sign in
                    </button>
                )}
            </div>

            {/* Modal Component */}
            <LoginModal isOpen={isOpen} onClose={closeModal} />
        </>
    )
}
