import { CabinId } from '@/app/lib/cabin';
import Image from 'next/image';
import Link from 'next/link';
import CabinDescription from '@/app/components/CabinDescription';
import Box_Reservation from '@/app/components/Box_Reservation';

type PageProps = {
    params: Promise<{ cabinId: string }>;
};

export default async function Page({ params }: PageProps) {
    const cabinId = (await params).cabinId;
    const cabin = await CabinId(cabinId);

    const pricePerNight = cabin?.regularPrice - (cabin?.discount || 0);

    // Error state
    if (!cabin || !cabin.id) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 bg-white font-poppins text-black">
                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 text-text animate-scale-in">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h2 className="text-4xl font-extrabold text-text mb-4 animate-fade-in-up">Cabin Not Found</h2>
                <p className="text-zinc-500 mb-10 max-w-md font-mulish text-[15px] leading-relaxed animate-fade-in-up animation-delay-200">
                    We couldn&apos;t find the cabin you&apos;re looking for. It might have been removed or the link is incorrect.
                </p>
                <Link href="/cabins" className="bg-text text-white px-10 py-4 hover:bg-[#635334] font-semibold transition-all shadow-lg shadow-amber-900/15 active:scale-95 animate-fade-in-up animation-delay-300">
                    Browse All Cabins
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-poppins">

            {/* ========== HERO SECTION — Image Left + Info Right ========== */}
            <section className="cabin-detail-hero bg-[#3b3222]">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[650px]">

                    {/* Left — Image */}
                    <div className="relative h-[400px] lg:h-auto overflow-hidden">
                        <Image
                            src={cabin.image}
                            alt={cabin.name}
                            fill
                            className="object-cover animate-fade-in"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        {/* Discount badge */}
                        {cabin.discount > 0 && (
                            <div className="absolute top-6 left-6 z-10 bg-[#7C6A46] text-white text-[11px] font-bold px-4 py-2 uppercase tracking-wider shadow-lg">
                                Save ${cabin.discount}/night
                            </div>
                        )}
                    </div>

                    {/* Right — Info */}
                    <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-14 lg:py-20 text-white">

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-[12px] font-mulish text-white/40 mb-8">
                            <Link href="/home" className="hover:text-white/70 transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/cabins" className="hover:text-white/70 transition-colors">Cabins</Link>
                            <span>/</span>
                            <span className="text-[#c4a96a]">{cabin.name}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in-up text-white">
                            {cabin.name}
                        </h1>

                        {/* Description with show more/less */}
                        <div className="mb-10 animate-fade-in-up animation-delay-100">
                            <CabinDescription description={cabin.description} />
                        </div>

                        {/* Info items */}
                        <div className="space-y-5 animate-fade-in-up animation-delay-200">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#7C6A46]/30 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px] text-[#c4a96a]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                </div>
                                <p className="text-[15px] font-mulish text-white/80">
                                    For up to <strong className="text-white font-bold">{cabin.maxCapacity}</strong> guests
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#7C6A46]/30 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px] text-[#c4a96a]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <p className="text-[15px] font-mulish text-white/80">
                                    Located in the heart of the <strong className="text-white font-bold">Paradise Forest</strong>
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#7C6A46]/30 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px] text-[#c4a96a]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                    </svg>
                                </div>
                                <p className="text-[15px] font-mulish text-white/80">
                                    Privacy <strong className="text-white font-bold">100%</strong> guaranteed
                                </p>
                            </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10 animate-fade-in-up animation-delay-300">
                            <div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-extrabold text-[#c4a96a]">${pricePerNight}</span>
                                    <span className="text-white/40 text-[14px]">/ night</span>
                                </div>
                                {cabin.discount > 0 && (
                                    <span className="text-white/30 text-[13px] line-through">${cabin.regularPrice}/night</span>
                                )}
                            </div>
                            <Box_Reservation />
                        </div>

                    </div>
                </div>
            </section>

            {/* ========== AMENITIES SECTION ========== */}
            <section className="py-20 md:py-24 bg-[#faf8f5]">
                <div className="container">
                    <div className="text-center pb-14 animate-fade-in-up">
                        <div className="golden-line mx-auto mb-5"></div>
                        <span className="text-[11px] font-bold text-text uppercase tracking-[0.25em] block pb-3">What&apos;s Included</span>
                        <h2 className="text-3xl md:text-[38px] font-extrabold text-text leading-tight">
                            Premium Amenities
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Up to {cabin.maxCapacity} Guests</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Spacious layout for families or groups.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <Image src="/wifi.svg" width={28} height={28} alt="wifi" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">High-Speed Wi-Fi</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Complimentary fiber-optic internet.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <Image src="/tv.svg" width={28} height={28} alt="tv" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">4K Smart TV</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Premium streaming services included.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <Image src="/shower.svg" width={28} height={28} alt="shower" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Luxury Rain Shower</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Spa-inspired bathroom with premium toiletries.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Fireplace &amp; Kitchen</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Cozy fireplace and fully-equipped kitchen.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex items-start gap-5 bg-white border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center text-text flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Private Hot Tub</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Relax under the stars in your own hot tub.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========== POLICIES SECTION ========== */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container">
                    <div className="text-center pb-14 animate-fade-in-up">
                        <div className="golden-line mx-auto mb-5"></div>
                        <span className="text-[11px] font-bold text-text uppercase tracking-[0.25em] block pb-3">Good to Know</span>
                        <h2 className="text-3xl md:text-[38px] font-extrabold text-text leading-tight">
                            Policies &amp; House Rules
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="amenity-card flex flex-col items-center text-center gap-4 bg-[#faf8f5] border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-text">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Check-in: 2:00 PM</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Anytime from 2:00 PM onwards. Early check-in upon request.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex flex-col items-center text-center gap-4 bg-[#faf8f5] border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-text">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Check-out: 12:00 PM</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Before noon. Leave keys at the reception counter.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex flex-col items-center text-center gap-4 bg-[#faf8f5] border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-text">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">Free Cancellation</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">Free cancel up to 7 days before. 50% within 7 days.</p>
                            </div>
                        </div>

                        <div className="amenity-card flex flex-col items-center text-center gap-4 bg-[#faf8f5] border border-zinc-100 rounded-2xl p-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-text">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-text text-[16px] mb-1">House Rules</h3>
                                <p className="text-zinc-400 font-mulish text-[13px] leading-relaxed">No smoking. Pets on request. Quiet hours after 10 PM.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </div>
    );
}