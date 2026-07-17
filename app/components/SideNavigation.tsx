'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from "next-auth/react"

const navLinks = [
  {
    name: 'Profile',
    href: '/account/profile',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    name: 'Bookings',
    href: '/account/bookings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },


]

export default function SideNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="md:border-r md:border-zinc-200 h-full md:pt-4 md:pb-12 w-full md:w-64 md:pr-8">
      {/* Nút Hamburger (Chỉ hiển thị trên mobile) - Cố định màn hình */}
      <div className="md:hidden fixed top-[110px] left-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-text text-white rounded-full shadow-lg hover:bg-[#635334] transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      <ul className={`
        flex-col gap-2 text-sm font-poppins
        ${isOpen ? 'fixed top-[165px] left-4 z-[60] w-max bg-white p-3 rounded-2xl shadow-2xl border border-zinc-100 flex animate-fade-in' : 'hidden'} 
        md:relative md:top-auto md:left-auto md:z-auto md:w-full md:bg-transparent md:p-0 md:shadow-none md:border-none md:flex
      `}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 font-semibold
                  ${isActive
                    ? 'bg-[#7C6A46] text-white shadow-md'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          )
        })}

        {/* Nút Đăng xuất ở dưới cùng */}
        <li className="mt-8 border-t border-zinc-200 pt-8">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 font-semibold text-rose-600 hover:bg-rose-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
