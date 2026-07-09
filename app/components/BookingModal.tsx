'use client'

import React, { useEffect, useState } from 'react'
import { CabinResponse } from '../types/CabinType'
import Modal from './Modal'
import { BookedDates, CreatBooking } from '../lib/booking'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BookingRessponse } from '../types/BookingType'

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cabin: CabinResponse;
    token: string;
}

export default function BookingModal({ isOpen, onClose, cabin }: BookingModalProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [disabledDates, setDisabledDates] = useState<{ start: Date, end: Date }[]>([]);
    const [formData, setFormData] = useState({
        numGuests: 1,
        observations: ""
    });

    const pricePerNight = cabin.regularPrice - (cabin.discount || 0);
    console.log(cabin.id, "iiiiiiiiiiiiiiiiiiiiiị");

    useEffect(() => {
        const loadDated = async () => {
            const res = await BookedDates(cabin.id.toString());
            console.log(res, "ressssssssssssss");
            const arr = res.map((item: BookingRessponse) => {
                return {
                    start: new Date(item.startDate),
                    end: new Date(item.endDate),
                };
            })
            setDisabledDates(arr);
            console.log(arr, "arrrr");

        }
        loadDated()
    }, [session?.accessToken, cabin.id])
    console.log(disabledDates, "disabledDates");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(" Check-in :", start);
        console.log(" Check-out :", end);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            toast.error("Vui lòng chọn ngày đi và ngày về!");
            return;
        }
        if (endDate <= startDate) {
            toast.error("Ngày Check-out phải diễn ra sau ngày Check-in!");
            return;
        }
        const payload = {
            cabinId: cabin.id,
            startDate: startDate,
            endDate: endDate,
            numGuests: Number(formData.numGuests),
            observations: formData.observations
        }
        console.log(payload, "payloadddd");

        setLoading(true);
        try {
            const token = session?.accessToken;
            if (token) {
                const res = await CreatBooking(token, payload)
                if (res) {
                    toast.success("Đặt phòng thành công!");
                    router.push("/account/bookings"); // Chuyển về trang lịch sử đặt phòng thay vì /cabins
                    onClose(); // Đóng modal
                } else {
                    toast.error("Đặt phòng thất bại, vui lòng thử lại!");
                }
            } else {
                toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi hệ thống!");
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    // Tính toán số đêm và tổng tiền
    let nights = 0;
    if (startDate && endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const totalPrice = nights > 0 ? nights * pricePerNight : 0;

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
            {/* Top Accent Strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7C6A46] via-[#a08c62] to-[#7C6A46]"></div>

            {/* Header */}
            <div className="flex justify-between items-center px-8 pt-6 pb-5 border-b border-zinc-100">
                <div>
                    <span className="text-[10px] font-bold text-[#7C6A46] uppercase tracking-[0.25em] block mb-1.5">Reservation</span>
                    <h2 className="text-2xl font-extrabold text-text font-poppins">Book {cabin.name}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer text-xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>

            {/* Booking Form — 2 cột: Lịch | Thông tin + Summary */}
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">

                {/* ===== CỘT TRÁI: Lịch chọn ngày ===== */}
                <div className="lg:w-[55%] p-8 flex flex-col gap-5 items-center justify-start bg-zinc-50/40 border-r border-zinc-100">
                    <div className="flex w-full justify-between items-center mb-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Select check-in &amp; check-out</p>
                        {(startDate || endDate) && (
                            <button
                                type="button"
                                onClick={() => { setStartDate(null); setEndDate(null); }}
                                className="text-[11px] font-bold text-[#7C6A46] hover:text-[#635334] uppercase tracking-wider flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#7C6A46]/10 transition-all cursor-pointer"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="w-full flex justify-center bg-white border border-zinc-200/70 rounded-2xl p-4 shadow-sm font-mulish">
                        <DatePicker
                            inline
                            selectsRange={true}
                            startDate={startDate ?? undefined}
                            endDate={endDate ?? undefined}
                            onChange={handleDateChange}
                            excludeDateIntervals={disabledDates}
                            minDate={new Date()}
                        />
                    </div>

                    {/* Check-in / Check-out indicators */}
                    <div className="flex w-full gap-4 mt-5">
                        <div className="flex-1 bg-white border border-zinc-200/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Check-in</span>
                            <span className="text-sm font-bold text-text font-mulish">{startDate ? startDate.toLocaleDateString('vi-VN') : '— / — / —'}</span>
                        </div>
                        <div className="flex-1 bg-white border border-zinc-200/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Check-out</span>
                            <span className="text-sm font-bold text-text font-mulish">{endDate ? endDate.toLocaleDateString('vi-VN') : '— / — / —'}</span>
                        </div>
                    </div>
                </div>

                {/* ===== CỘT PHẢI: Form + Summary ===== */}
                <div className="lg:w-[45%] p-6 lg:p-8 flex flex-col gap-5">

                    {/* Guests */}
                    <div className='flex flex-col gap-2.5'>
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5" htmlFor="book-guests">
                            <svg className="w-3.5 h-3.5 text-[#7C6A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Number of guests
                        </label>
                        <div className="relative group">
                            <select
                                name="numGuests"
                                id="book-guests"
                                value={formData.numGuests}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#7C6A46]/20 focus:border-[#7C6A46] focus:bg-white transition-all font-mulish cursor-pointer appearance-none font-semibold hover:border-zinc-300 hover:bg-white"
                            >
                                {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num} Guest{num > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-zinc-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {/* Special requests */}
                    <div className='flex flex-col gap-2.5'>
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5" htmlFor="book-obs">
                            <svg className="w-3.5 h-3.5 text-[#7C6A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                            Special requests
                        </label>
                        <textarea
                            id="book-obs"
                            rows={3}
                            name="observations"
                            value={formData.observations}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#7C6A46]/20 focus:border-[#7C6A46] focus:bg-white transition-all font-mulish resize-none placeholder:text-zinc-400 hover:border-zinc-300 hover:bg-white"
                            placeholder="Dietary needs, pets, late check-in…"
                        />
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-[#faf8f5] border border-[#e8e1d4] rounded-2xl p-5 space-y-3 font-mulish text-[13px] mt-1">
                        <h4 className="font-poppins font-extrabold text-text text-sm uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#e8e1d4]">
                            <svg className="w-4 h-4 text-[#7C6A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            Summary
                        </h4>

                        <div className="flex justify-between items-center py-0.5">
                            <span className="text-zinc-500">Price / night</span>
                            <div className="flex items-center gap-2">
                                {cabin.discount > 0 && (
                                    <span className="text-xs text-zinc-400 line-through">${cabin.regularPrice}</span>
                                )}
                                <span className="font-extrabold text-[#7C6A46]">${pricePerNight}</span>
                            </div>
                        </div>

                        {nights > 0 && (
                            <div className="flex justify-between items-center py-0.5">
                                <span className="text-zinc-500">Nights</span>
                                <span className="font-bold text-text">{nights}</span>
                            </div>
                        )}

                        {cabin.discount > 0 && nights > 0 && (
                            <div className="flex justify-between items-center py-0.5 text-emerald-600">
                                <span className="font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                                    Discount
                                </span>
                                <span className="font-semibold">-${cabin.discount * nights}</span>
                            </div>
                        )}

                        <div className="h-px w-full bg-[#e2dcd0]/60"></div>

                        <div className="flex justify-between items-center pt-1.5 pb-0.5">
                            <span className="font-extrabold text-text text-base">Total</span>
                            <span className="font-extrabold text-[#7C6A46] text-xl">${totalPrice}</span>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || nights === 0}
                        className={`w-full py-3.5 bg-text hover:bg-[#635334] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/15 flex items-center justify-center gap-2 font-poppins text-sm ${(loading || nights === 0) ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-xl'}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Processing…
                            </>
                        ) : (
                            <span>Confirm Reservation</span>
                        )}
                    </button>

                    <p className="text-[10px] text-center text-zinc-400 font-mulish flex items-center justify-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Secure booking · You won&apos;t be charged yet
                    </p>
                </div>
            </form>
        </Modal>
    )
}
