'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import Modal from './Modal'

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
            <div className='text-text py-8 flex flex-col gap-2.5 items-center'>
                <div><h3 className='font-extrabold'>Thực hiện lựa chọn Sign-in:</h3></div>
                <div>
                    <button onClick={() => signIn('google')} className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"><Image src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height={24} width={24} /><span>Continue with Google</span></button>
                </div>
            </div>
        </Modal>
    )
}
