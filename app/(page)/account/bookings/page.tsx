
import BookingCard from "@/app/components/BookingCard";
import { GetServerSession } from "@/app/lib/auth";
import { ListBooking } from "@/app/lib/booking"
import { BookingRessponse } from "@/app/types/BookingType";
import Link from "next/link";

export const metadata = {
    title: 'Bookings'
}

export default async function BookingsPage() {
    const session = await GetServerSession();
    console.log(session, "sssssssssssssssss");
    if (!session?.accessToken) return;
    const res = await ListBooking(session.accessToken);
    console.log(res, "listBookingss");

    return (
        <div className="">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-4 sm:mb-8 font-poppins tracking-tight pb-[20px] sm:pb-[50px]">Your Reservations</h2>

            {/* <div className="bg-white rounded-3xl p-10 border border-[#e2dcd0]/50 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]"> */}

            <div className="absolute top-0 right-0 w-64 h-64 bg-[#faf8f5] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#faf8f5] rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>

            {res ?
                <div className=" flex flex-col gap-2.5">
                    {res.map((item: BookingRessponse) => {
                        return (<BookingCard key={item.id} item={item} />)
                    })}
                </div> :
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-[#faf8f5] rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#e2dcd0]/30 text-[#7C6A46]">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-text mb-2 sm:mb-3 font-poppins text-center">No reservations yet</h3>
                    <p className="text-sm sm:text-base text-zinc-500 font-mulish max-w-sm mb-6 sm:mb-8 leading-relaxed text-center px-4">
                        You do not have any upcoming stays. Start planning your next luxury getaway with us.
                    </p>

                    <Link
                        href="/cabins"
                        className="px-8 py-3.5 bg-text hover:bg-[#635334] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/20 font-poppins text-sm flex items-center gap-2 active:scale-95"
                    >
                        <span>Explore Our Cabins</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>}

        </div>
        // </div>
    )
}
