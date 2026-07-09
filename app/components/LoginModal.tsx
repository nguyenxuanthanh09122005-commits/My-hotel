'use client'

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect } from 'react'
import Modal from './Modal'

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            onClose();
        }
    }, [status, onClose]);

    if (status === 'authenticated') return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[420px]">
            {/* Top decorative line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#7C6A46] via-[#a08c62] to-[#7C6A46]"></div>

            <div className="px-8 pt-8 pb-10 flex flex-col items-center gap-5 text-center relative">

                <div className="font-mulish text-[14px] text-zinc-500 mb-8 leading-relaxed px-2">
                    Sign in to access your reservations, manage your profile, and discover exclusive offers.
                </div>

                {/* Login Button */}
                <button
                    onClick={() => signIn('google')}
                    className="w-full relative group flex items-center justify-center gap-3 bg-white text-text border border-zinc-200 hover:border-[#7C6A46]/50 rounded-xl px-6 py-3.5 font-semibold text-[15px] transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    <Image
                        src="https://authjs.dev/img/providers/google.svg"
                        alt="Google logo"
                        height={22}
                        width={22}
                        className="absolute left-6 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-poppins tracking-wide">Continue with Google</span>
                </button>

                <div className="mt-8 text-[11px] text-zinc-400 font-mulish uppercase tracking-widest font-bold">
                    The Wild Oasis Hotel
                </div>
            </div>
        </Modal>
    )
}
