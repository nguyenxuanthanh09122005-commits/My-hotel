import React from 'react'
import Image from 'next/image'
export default function page() {
    return (
        <div className=' text-black flex flex-col '>
            <section className="flex section flex-col items-center justify-center font-mulish">
                <div className='flex flex-col w-full  '>
                    <div className="w-full  ">
                        <Image src="/rooms_suites.svg" alt="Banner" width={1600}
                            height={600} className='w-full h-auto' />
                    </div>

                </div>
            </section >

            <section className="section font-poppins  ">
                <div className='container'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[47px] gap-x-[51px]">
                        {/* Card 1 */}
                        <div className="flex flex-col text-text gap-[20px]">
                            <div>
                                <Image src="/Rooms.svg" alt="Room 1" width={800} height={400} className='w-full h-auto' />
                            </div>
                            <div className="flex items-center justify-between  w-full">
                                <div>
                                    <h2 className='font-semibold text-[25px]'>The Royal Room</h2>
                                </div>
                                <div className='font-mulish text-[12px]'>Available: Yes</div>
                            </div>
                            <div className='font-medium text-[20px]'>₦190,000</div>
                            <div><hr /></div>
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <div className='flex gap-[27px]  icon'>
                                    <div><Image src="/tv.svg" width={50} height={50} alt='tv' className='w-full h-auto ' /></div>
                                    <div><Image src="/shower.svg" alt='shower' width={50} height={50} className='w-full h-auto' /></div>
                                    <div><Image src="/wifi.svg" alt='wifi' width={50} height={50} className='w-full h-auto' /></div>
                                </div>
                                <div>
                                    <button className='bg-text text-white px-[36px] py-[12px] text-[15px]'>Book now</button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col text-text gap-[20px]">
                            <div>
                                <Image src="/Rooms.svg" alt="Room 2" width={800} height={400} className='w-full h-auto' />
                            </div>
                            <div className="flex items-center justify-between  w-full">
                                <div>
                                    <h2 className='font-semibold text-[25px]'>The Royal Room</h2>
                                </div>
                                <div className='font-mulish text-[12px]'>Available: Yes</div>
                            </div>
                            <div className='font-medium text-[20px]'>₦190,000</div>
                            <div><hr /></div>
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <div className='flex gap-[27px]  icon'>
                                    <div><Image src="/tv.svg" width={50} height={50} alt='tv' className='w-full h-auto ' /></div>
                                    <div><Image src="/shower.svg" alt='shower' width={50} height={50} className='w-full h-auto' /></div>
                                    <div><Image src="/wifi.svg" alt='wifi' width={50} height={50} className='w-full h-auto' /></div>
                                </div>
                                <div>
                                    <button className='bg-text text-white px-[36px] py-[12px] text-[15px]'>Book now</button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col text-text gap-[20px]">
                            <div>
                                <Image src="/Rooms.svg" alt="Room 3" width={800} height={400} className='w-full h-auto' />
                            </div>
                            <div className="flex items-center justify-between  w-full">
                                <div>
                                    <h2 className='font-semibold text-[25px]'>The Royal Room</h2>
                                </div>
                                <div className='font-mulish text-[12px]'>Available: Yes</div>
                            </div>
                            <div className='font-medium text-[20px]'>₦190,000</div>
                            <div><hr /></div>
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <div className='flex gap-[27px]  icon'>
                                    <div><Image src="/tv.svg" width={50} height={50} alt='tv' className='w-full h-auto ' /></div>
                                    <div><Image src="/shower.svg" alt='shower' width={50} height={50} className='w-full h-auto' /></div>
                                    <div><Image src="/wifi.svg" alt='wifi' width={50} height={50} className='w-full h-auto' /></div>
                                </div>
                                <div>
                                    <button className='bg-text text-white px-[36px] py-[12px] text-[15px]'>Book now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
