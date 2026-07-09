'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  {
    name: 'Setting',
    href: '/account/setting',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },

]

export default function SideNavigation() {
  const pathname = usePathname()

  return (
    <nav className="border-r border-zinc-200 h-full pt-4 pb-12 w-full md:w-64 md:pr-8">
      <ul className="flex flex-col gap-2 text-sm font-poppins">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <li key={link.name}>
              <Link
                href={link.href}
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
