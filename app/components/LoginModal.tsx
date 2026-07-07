'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {

    const [isLoading, setIsLoading] = useState(false)

    // Reset form when modal closes or opens
    useEffect(() => {
        if (!isOpen) {

        }
    }, [isOpen])

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-[100] ">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
                onClick={onClose}
            ></div>

            {/* Modal Box Wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-in border border-zinc-100 font-poppins z-100">
                    <div className='text-text py-8 flex flex-col gap-2.5 items-center'>
                        <div><h3 className='font-extrabold'>Thực hiện lựa chọn Sign-in:</h3></div>
                        <div>
                            <button onClick={() => signIn('google')} className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"><Image src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height={24} width={24} /><span>Continue with Google</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)

}
