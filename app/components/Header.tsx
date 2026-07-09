import React from 'react'
import Nav_Header from './Nav_Header'

export default function Header() {
    return (
        <header className="container flex  justify-between sticky top-0 w-full z-50 h-[96px] bg-white/80 backdrop-blur-md border-b border-zinc-100/50">
            {/* <div className=' w-full h-full flex items-center justify-between px-[120.67px] text-[15px]'> */}
            <Nav_Header />
            {/* </div> */}
        </header>
    )
}
