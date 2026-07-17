"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BoxLogin from './BoxLogin'

export default function Nav_Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cabins', label: 'Cabins' },
        { href: '/about', label: 'About' },
    ];

    return (
        <div className="relative w-full mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
            {/* 1. Phần Logo */}
            <div className="flex-shrink-0  w-[60px]">
                <Link href="/" className='h-full w-full'>
                    <Image src="/iconne.svg" alt="Logo" width={50} height={50} className='w-full h-auto' />
                </Link>
            </div>

            {/* 2. Phần Menu Link (Desktop/Laptop) */}
            <div className="hidden lg:block">
                <ul className="flex items-center gap-4 md:gap-[30px] lg:gap-[61px]">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`relative font-poppins font-medium text-sm md:text-base lg:text-lg py-1 transition-colors duration-300 ${isActive ? 'text-text font-bold' : 'text-zinc-600 hover:text-text'
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-text rounded-full animate-fade-in" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* 3. Phần Nút Action & Nút Mobile Menu */}
            <div className='flex items-center gap-2 sm:gap-4'>
                <BoxLogin />

                {/* Nút Hamburger cho Mobile và Tablet */}
                <button
                    className="lg:hidden p-1 text-zinc-600 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md border-t border-gray-100 lg:hidden z-50">
                    <ul className="flex flex-col py-4 px-6 space-y-4">
                        {navLinks.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                            return (
                                <li key={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link
                                        href={link.href}
                                        className={`block font-poppins text-base py-2 border-b border-gray-50 ${isActive ? 'text-text font-bold' : 'text-zinc-600 hover:text-text'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
