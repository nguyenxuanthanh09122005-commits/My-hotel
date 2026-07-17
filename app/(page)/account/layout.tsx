import { Suspense } from 'react'
import SideNavigation from '@/app/components/SideNavigation'
import React from 'react'

export const metadata = {
    title: 'Account',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex justify-between'>
            <div className=" mx-auto px-4 w-full pt-8 md:pt-16 pb-12 md:pb-24">
                <div className="w-full container flex flex-col md:flex-row gap-0 md:gap-12 ">
                    <SideNavigation />
                    <div className="flex-1 w-full  ">
                        <div className=''>
                            <Suspense fallback={
                                <div className="flex items-center justify-center min-h-[40vh]">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 border-4 border-[#7C6A46]/30 border-t-[#7C6A46] rounded-full animate-spin"></div>
                                        <p className="text-sm text-zinc-500 font-mulish">Loading...</p>
                                    </div>
                                </div>
                            }>
                                {children}
                            </Suspense>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
