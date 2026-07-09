'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    disableClose?: boolean;
}

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-md', disableClose = false }: ModalProps) {
    // Prevent SSR hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !isMounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in ${disableClose ? '' : 'cursor-pointer'}`}
                onClick={disableClose ? undefined : onClose}
            ></div>

            {/* Content Container */}
            <div className={`bg-white rounded-2xl shadow-2xl w-full md:w-auto ${maxWidth} max-h-[95vh] overflow-y-auto mx-4 relative z-[100000] animate-scale-in border border-zinc-100 font-poppins`}>
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
