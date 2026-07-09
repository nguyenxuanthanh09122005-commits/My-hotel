import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="flex flex-col font-mulish">
            {/* ===== Hero Banner Section ===== */}
            <section className="flex section flex-col items-center justify-center font-mulish">
                <div className=' w-full relative overflow-hidden'>
                    <div className="w-full" data-aos="zoom-out" data-aos-duration="1500">
                        <Image src="/rooms_suites.svg" alt="Banner" width={1600}
                            height={600} className='w-full h-auto object-cover' />
                    </div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[654px] px-4 box-title' data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                        <h1 className='font-extrabold'>About us</h1>
                        <p className=''>The elegant luxury bedrooms in this gallery showcase custom interior<br />
                            designs & decorating ideas. View pictures and find your<br />
                            perfect luxury bedroom design.</p>
                    </div>
                </div>
            </section >

            {/* ===== Manager Introduction Section ===== */}
            <section className="container section ">
                <div className='flex flex-col gap-[74px]'>
                    <div className="flex flex-col xl:flex-row gap-16 xl:gap-[149px] items-start justify-center">
                        {/* Left: Manager Image & Name */}
                        <div className='pt-7 flex flex-col gap-5'>
                            <div className="flex flex-col items-center xl:items-center shrink-0 mx-auto xl:mx-0" data-aos="fade-right" data-aos-duration="1000">


                                <div className="relative mt-6">
                                    {/* Decorative background box - matching Figma */}
                                    <div className="absolute -top-6 -right-6 w-full h-full bg-[#8b7952]" />
                                    <div className="relative z-10 max-w-[458px] max-h-[613px] overflow-hidden bg-white">
                                        <Image
                                            src="/manager_about.svg"
                                            alt="Chidinma James - Hotel Manager"
                                            width={458}
                                            height={613}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 text-[#000000] font-semibold text-[30px] text-center" data-aos="fade-up" data-aos-delay="300">
                                Chidinma James (Manager)
                            </div>
                        </div>

                        {/* Right: Description Text */}
                        <div className="max-w-[579px] gap-x-12 gap-y-6 font-mulish text-[#3f3f46] flex-1" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
                            <div className="flex flex-col gap-6">
                                <p className="!text-[13px] leading-relaxed text-justify">
                                    The United Nations is an international organization founded in 1945. Currently
                                    made up of 193 Member States, the <span className="underline">UN and its work</span> are guided by the purposes
                                    and principles contained in its founding <span className="underline">Charter</span>.
                                    The UN has evolved over the years to keep pace with a rapidly changing world.
                                    But one thing has stayed the same: it remains the one place on Earth where all the
                                    world&apos;s nations can gather together, discuss common problems, and find shared
                                    solutions that benefit all of humanity. The <span className="underline">Secretary-General</span> is Chief
                                    Administrative Officer of the UN – and is also a symbol of the Organization&apos;s ideals
                                    and an advocate for all the world&apos;s peoples, especially the poor and vulnerable.
                                </p>
                                <p className="!text-[13px] leading-relaxed text-justify">
                                    The Secretary-General is appointed by the <span className="underline font-semibold">General Assembly</span> on the
                                    recommendation of the <span className="underline">Security Council</span> for a 5-year, renewable term.
                                    The current Secretary-General, and the 9th occupant of the post, is António
                                    Guterres of Portugal, who took office on 1 January 2017.
                                    On the 18th of June, 2021, <span className="underline">Guterres was re-appointed to a second term</span>, pledging
                                    as his priority to continue helping the world chart a course out of the <span className="underline">COVID-19</span>{' '}
                                    pandemic.
                                </p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <p className="!text-[13px] leading-relaxed text-justify">
                                    The United Nations is an international organization founded in 1945. Currently
                                    made up of 193 Member States, the <span className="underline">UN and its work</span> are guided by the purposes
                                    and principles contained in its founding <span className="underline">Charter</span>.
                                    The UN has evolved over the years to keep pace with a rapidly changing world.
                                    But one thing has stayed the same: it remains the one place on Earth where all the
                                    world&apos;s nations can gather together, discuss common problems, and find shared
                                    solutions that benefit all of humanity. The <span className="underline">Secretary-General</span> is Chief
                                    Administrative Officer of the UN – and is also a symbol of the Organization&apos;s ideals
                                    and an advocate for all the world&apos;s peoples, especially the poor and vulnerable.
                                </p>
                                <p className="!text-[13px] leading-relaxed text-justify">
                                    The Secretary-General is appointed by the <span className="underline font-semibold">General Assembly</span> on the
                                    recommendation of the <span className="underline">Security Council</span> for a 5-year, renewable term.
                                    The current Secretary-General, and the 9th occupant of the post, is António
                                    Guterres of Portugal, who took office on 1 January 2017.
                                    On the 18th of June, 2021, <span className="underline">Guterres was re-appointed to a second term</span>, pledging
                                    as his priority to continue helping the world chart a course out of the <span className="underline">COVID-19</span>{' '}
                                    pandemic.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10">
                        <h2 className=" font-semibold text-black text-center" data-aos="fade-up">
                            Clients
                        </h2>

                        {/* Client Logos */}

                        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
                            {/* NNPC */}
                            <a href='https://nnpcgroup.com/' target="_blank" rel="noopener noreferrer" className="client-logo opacity-70 hover:opacity-100 transition-opacity duration-300" data-aos="zoom-in" data-aos-delay="100">
                                <div className="relative w-24 h-12">
                                    <Image src="/nnpc.svg" alt="NNPC" fill className="object-contain" />
                                </div>
                            </a>
                            {/* Client Logo 2 */}
                            <a href='https://nigeriaembassyusa.org/explanation-of-the-nigeria-coat-of-arms/' target="_blank" rel="noopener noreferrer" className="client-logo opacity-70 hover:opacity-100 transition-opacity duration-300" data-aos="zoom-in" data-aos-delay="200">
                                <div className="relative w-24 h-12">
                                    <Image src="/eagel.svg" alt="Client Logo 2" fill className="object-contain" />
                                </div>
                            </a>
                            {/* NGE */}
                            <a href='https://www.nge.fr/en/nge-engineering/' target="_blank" rel="noopener noreferrer" className="client-logo opacity-70 hover:opacity-100 transition-opacity duration-300" data-aos="zoom-in" data-aos-delay="300">
                                <div className="relative w-24 h-12">
                                    <Image src="/ncc.svg" alt="NGE" fill className="object-contain" />
                                </div>
                            </a>
                            {/* Client Logo 4 */}
                            <a href='https://vietnam.un.org/vi' target="_blank" rel="noopener noreferrer" className="client-logo opacity-70 hover:opacity-100 transition-opacity duration-300" data-aos="zoom-in" data-aos-delay="400">
                                <div className="relative w-24 h-12">
                                    <Image src="/image 4.svg" alt="Client Logo 4" fill className="object-contain" />
                                </div>
                            </a>
                            {/* NIRSAL */}
                            <a href='https://nirsal.com/' target="_blank" rel="noopener noreferrer" className="client-logo opacity-70 hover:opacity-100 transition-opacity duration-300" data-aos="zoom-in" data-aos-delay="500">
                                <div className="relative w-24 h-12">
                                    <Image src="/nirsal.svg" alt="NIRSAL" fill className="object-contain" />
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </section >

        </div >
    )
}
