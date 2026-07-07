import SideNavigation from '@/app/components/SideNavigation'
import React from 'react'

export const metadata = {
    title: 'Account',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex justify-between'>
            <div className=" mx-auto px-4 w-full pt-16 pb-24">
                <div className="w-full container flex flex-col md:flex-row gap-12 min-h-[600px]">
                    <SideNavigation />
                    <div className="flex-1 w-full  ">
                        <div className=''>
                            {children}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
