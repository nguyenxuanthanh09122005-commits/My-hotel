"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BoxLogin from './BoxLogin'

export default function Nav_Header() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cabins', label: 'Cabins' },
        { href: '/about', label: 'About' },
        { href: '/explore', label: 'Explore' },
    ];

    return (
        <div className=" w-full mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
            {/* 1. Phần Logo */}
            <div className="flex-shrink-0">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                </Link>
            </div>

            {/* 2. Phần Menu Link */}
            <div className="hidden sm:block">
                <ul className="flex items-center gap-4 sm:gap-6 md:gap-[30px] lg:gap-[61px]">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                        
                        return (
                            <li key={link.href}>
                                <Link 
                                    href={link.href} 
                                    className={`relative font-poppins font-medium text-sm md:text-base py-1 transition-colors duration-300 ${
                                        isActive ? 'text-text font-bold' : 'text-zinc-600 hover:text-text'
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

            {/* 3. Phần Nút Action */}
            <div className='flex'>
                <BoxLogin />
            </div>
        </div>
    )
}
