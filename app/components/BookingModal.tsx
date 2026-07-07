'use client'

import React, { useState } from 'react'
import { CabinResponse } from '../types/CabinType'
import Modal from './Modal'
import { CreatBooking } from '../lib/booking'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cabin: CabinResponse;
    token: string;
}

export default function BookingModal({ isOpen, onClose, cabin, token }: BookingModalProps) {
    const { data: session, status } = useSession();
    console.log(session?.accessToken, "hihihi");
    const router = useRouter();


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cabinId: cabin.id,
        startDate: "",
        endDate: "",
        numGuests: 1,
        observations: ""
    })
    const pricePerNight = cabin.regularPrice - (cabin.discount || 0);

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(e, "eeeee");

        setFormData({ ...formData, [name]: value });
    }
    console.log(formData, "formData");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Chống bỏ trống ngày tháng
        if (!formData.startDate || !formData.endDate) {
            toast.error("Vui lòng điền đủ thông tin!");
            return;
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        // 2. Logic: Ngày Check-out phải lớn hơn ngày Check-in
        if (end <= start) {
            toast.error("Ngày Check-out phải diễn ra sau ngày Check-in!");
            return;
        }

        const payload = {
            cabinId: cabin.id,
            startDate: start,
            endDate: end,
            numGuests: Number(formData.numGuests),
            observations: formData.observations
        }

        setLoading(true);
        try {
            const token = session?.accessToken;
            if (token) {
                const res = await CreatBooking(token, payload)
                if (res) {
                    toast.success("Đặt phòng thành công!");
                    console.log(res, "ressss");
                    router.push("/cabins");
                } else {
                    toast.error("Đặt phòng thất bại, vui lòng thử lại!");
                }
            } else {
                toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
            }

        } catch (error) {
            toast.error("Đã xảy ra lỗi hệ thống!");
            console.log(`Lỗi:${error}`);

        } finally {
            setLoading(false)
        }


    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-[#7C6A46]"></div>

            {/* Header */}
            <div className="flex justify-between items-start px-6 pt-5 pb-3">
                <div>
                    <span className="text-[10px] font-bold text-text uppercase tracking-widest block mb-1">Reservation Form</span>
                    <h2 className="text-2xl font-extrabold text-text">Book {cabin.name}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer text-xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>

            {/* Booking Form */}
            <form className="flex flex-col px-6 pb-6 pt-2 space-y-3.5 gap-9">
                {/* Cabin Quick Detail */}
                <div className="p-3 bg-[#faf8f5] border border-[#e2dcd0]/50 rounded-xl flex justify-between items-center text-[11px] font-mulish text-zinc-500">
                    <div>
                        <span className="block font-bold text-text mb-0.5">Price / Night</span>
                        <span className="text-[15px] font-extrabold text-[#7C6A46]">${pricePerNight}</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-text mb-0.5">Max Occupancy</span>
                        <span className="text-sm font-bold text-text">{cabin.maxCapacity} Guests</span>
                    </div>
                </div>

                {/* Dates Selection Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-text uppercase tracking-wider mb-1" htmlFor="book-start">
                            Check-in
                        </label>
                        <input
                            name='startDate'
                            type="date"
                            id="book-start"
                            min={getMinDate()}
                            // value={startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish cursor-pointer"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-text uppercase tracking-wider mb-1" htmlFor="book-end">
                            Check-out
                        </label>
                        <input
                            name='endDate'
                            type="date"
                            id="book-end"
                            min={getMinDate()}
                            // value={endDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish cursor-pointer"
                            required
                        />
                    </div>
                </div>

                {/* Number of Guests */}
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-text uppercase tracking-wider mb-1" htmlFor="book-guests">
                        Number of Guests
                    </label>
                    <select
                        name='numGuests'
                        id="book-guests"
                        // value={numGuests}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish cursor-pointer"
                    >
                        {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num} Guest{num > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Observations / Special Notes */}
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-text uppercase tracking-wider mb-1" htmlFor="book-obs">
                        Special Requirements &amp; Notes
                    </label>
                    <textarea
                        id="book-obs"
                        rows={2}
                        name='observations'
                        // value={observations}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish resize-none"
                        placeholder="Any request (e.g. dietary requirements, pets, late check-in)?"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit" onClick={(e) => handleSubmit(e)}
                    className="w-full py-2.5 bg-text hover:bg-[#635334] text-white font-semibold rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-amber-900/10 flex items-center justify-center gap-2 cursor-pointer font-poppins text-[13px]"
                >
                    <span>Confirm Reservation</span>
                </button>
            </form>
        </Modal>
    )
}
