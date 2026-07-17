"use client"
import { BookingRessponse } from '../types/BookingType'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { DeleteBooking } from '../lib/booking'
import toast from 'react-hot-toast'
import router from 'next/router'
import { useRouter } from 'next/navigation'

dayjs.extend(relativeTime)

type BookingCardProps = {
    item: BookingRessponse
}

export default function BookingCard(props: BookingCardProps) {
    const { item } = props;
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    // Recalculate number of nights using dayjs
    const calculatedNights = dayjs(item.endDate).diff(dayjs(item.startDate), 'day');

    // Status derived from startDate or item.status
    const isPastBooking = dayjs(item.startDate).isBefore(dayjs());
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            if (!session?.accessToken) return;
            const res = await DeleteBooking(session?.accessToken, id);
            console.log(res);
            toast.success("Xóa Vé thành công !")
            router.refresh();
        }
        catch (error) {
            toast.error("Có lỗi khi xóa vé !")
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col xl:flex-row border border-[#e2dcd0] rounded-2xl overflow-hidden bg-white text-zinc-800 w-full mb-6 shadow-sm hover:shadow-md transition-all duration-300 text-left relative z-10">
            <div className="relative w-full xl:w-64 h-40 sm:h-56 xl:h-auto shrink-0">
                <Image
                    src={item.cabins?.image || "https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?ixlib=rb-4.0.3"}
                    alt={item.cabins?.name || "Cabin"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-2">
                        <h2 className="text-lg sm:text-xl font-bold font-poppins text-text">
                            {calculatedNights} nights in {item.cabins?.name}
                        </h2>

                        <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wide">
                            {item.status}
                        </span>

                    </div>
                    <p className="text-zinc-500 font-mulish text-xs sm:text-sm">
                        {dayjs(item.startDate).format('DD/MM/YYYY')}
                        {/* <span className="text-text font-medium px-1">
                            {' ('}{dayjs(item.startDate).fromNow()}{') '}
                        </span> */}
                        &ndash; {dayjs(item.endDate).format('DD/MM/YYYY')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 sm:mt-6 gap-3 sm:gap-0">
                    <div className="flex items-center gap-3">
                        <span className="text-text font-bold text-xl sm:text-2xl font-poppins">
                            ${item.totalPrice}
                        </span>
                        <span className="text-zinc-500 flex items-center text-xs sm:text-sm font-mulish">
                            <span className="mr-2 text-text">&bull;</span> {item.numGuests} guest{item.numGuests > 1 ? 's' : ''}
                        </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-mulish">
                        Booked {dayjs(item.createdAt).format('DD/MM/YYYY, h:mm A')}
                    </p>
                </div>
            </div>

            <div className="w-full xl:w-32 shrink-0 flex flex-row xl:flex-col border-t xl:border-t-0 xl:border-l border-[#e2dcd0]">

                <Link href={`/account/bookings/edit/${item.id}`} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-text hover:bg-[#faf8f5] transition-colors border-r xl:border-r-0 xl:border-b border-[#e2dcd0] group tracking-wider font-poppins py-4 xl:py-0">
                    <svg className="w-4 h-4 text-text/70 group-hover:text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    EDIT
                </Link>
                <button onClick={() => handleDelete(item.id)} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-text hover:bg-red-50 hover:text-red-600 transition-colors group tracking-wider font-poppins py-4 xl:py-0">
                    <svg className="w-4 h-4 text-text/70 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    DELETE
                </button>
            </div>
        </div >
    )
}
