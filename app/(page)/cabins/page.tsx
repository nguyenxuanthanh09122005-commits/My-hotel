import React from 'react'
import Image from 'next/image'
import { CabinsList } from '@/app/components/CabinsList'
import Filter from '@/app/components/Filter'
import { GetServerSession } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'

type PageProps = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function page({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const filter = (resolvedParams?.capacity || resolvedParams?.capicity) as string || "all";
    const session = await getServerSession();
    console.log(session, "session");

    return (
        <div className=' text-black flex flex-col '>
            <section className="flex section flex-col items-center justify-center font-mulish">
                <div className=' w-full relative overflow-hidden'>
                    <div className="w-full" data-aos="zoom-out-down" data-aos-duration="1500">
                        <Image src="/rooms_suites.svg" alt="Banner" width={1600}
                            height={600} className='w-full h-auto object-cover' />
                    </div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[654px] px-4 box-title' data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="1200">
                        <h1 className='font-extrabold'>Rooms and Suites</h1>
                        <p className=''>The elegant luxury bedrooms in this gallery showcase custom interior<br />
                            designs & decorating ideas. View pictures and find your<br />
                            perfect luxury bedroom design.</p>

                        <div className="mt-8 animate-bounce" data-aos="fade-in" data-aos-delay="1000">
                            <a href="#cabins-list" aria-label="Scroll to cabins list">
                                <Image src="/scroll down.svg" alt="Scroll Down" width={50}
                                    height={90} className='w-auto h-auto mx-auto cursor-pointer' />
                            </a>
                        </div>
                    </div>
                </div>
            </section >

            <section id="cabins-list" className="section font-poppins">
                <div className='container '>

                    <div className='w-full flex  justify-end pb-3.5' data-aos="fade-left" data-aos-delay="100">
                        <Filter />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                        <CabinsList filter={filter} />
                    </div>
                </div>
            </section>
        </div>
    )
}
