"use client";

import React, { useState, useEffect } from 'react';
import { CabinResponse } from '../types/CabinType';

type BookingCardProps = {
    cabin: CabinResponse;
};

export default function BookingCard({ cabin }: BookingCardProps) {
    const { id, name, regularPrice, discount, maxCapacity } = cabin;
    const pricePerNight = regularPrice - discount;

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numGuests, setNumGuests] = useState('1');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate nights and total price
    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setNights(diffDays);
                setTotalPrice(diffDays * pricePerNight);
                setErrorMsg('');
            } else {
                setNights(0);
                setTotalPrice(0);
                if (checkIn && checkOut) {
                    setErrorMsg('Check-out date must be after check-in date');
                }
            }
        } else {
            setNights(0);
            setTotalPrice(0);
        }
    }, [checkIn, checkOut, pricePerNight]);

    // Handle form submit
    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!checkIn || !checkOut) {
            setErrorMsg('Please select both check-in and check-out dates.');
            return;
        }

        if (nights <= 0) {
            setErrorMsg('Invalid date range selected.');
            return;
        }

        if (!fullName.trim()) {
            setErrorMsg('Please enter your full name.');
            return;
        }

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    // Get today's date formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Get tomorrow's date formatted as YYYY-MM-DD
    const tomorrow = (() => {
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        return tomorrowDate.toISOString().split('T')[0];
    })();

    if (isSuccess) {
        return (
            <div className="bg-white border border-zinc-100 shadow-2xl rounded-2xl p-8 text-center animate-fade-in flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="font-poppins text-2xl font-bold text-text mb-2">Reservation Confirmed!</h3>
                <p className="font-mulish text-zinc-500 text-sm mb-6 max-w-xs">
                    Your stay at <span className="font-semibold text-text">{name}</span> has been booked. A confirmation email has been sent to <span className="font-medium text-text">{email}</span>.
                </p>
                <div className="w-full bg-zinc-50 rounded-xl p-4 mb-6 text-left border border-zinc-100 text-[13px] text-zinc-600 space-y-2">
                    <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-semibold text-text">{checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-semibold text-text">{checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Nights:</span>
                        <span className="font-semibold text-text">{nights} nights</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-semibold text-text">{numGuests} guests</span>
                    </div>
                    <div className="border-t border-dashed border-zinc-200 my-2 pt-2 flex justify-between text-sm">
                        <span className="font-bold text-text">Total Paid:</span>
                        <span className="font-bold text-text">${totalPrice}</span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setCheckIn('');
                        setCheckOut('');
                        setFullName('');
                        setEmail('');
                        setNotes('');
                        setNights(0);
                        setTotalPrice(0);
                    }}
                    className="w-full py-3 bg-text hover:bg-[#635334] text-white font-medium rounded-xl transition-all duration-300 transform active:scale-95 shadow-md shadow-amber-900/10 cursor-pointer text-[14px]"
                >
                    Book Another Stay
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-zinc-100 shadow-2xl rounded-2xl p-6 lg:p-8 animate-fade-in relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-amber-800 to-amber-600"></div>

            <div className="flex items-baseline justify-between mb-6">
                <div>
                    {discount > 0 ? (
                        <div className="flex flex-col">
                            <span className="text-[12px] font-medium text-zinc-400 line-through">${regularPrice} / night</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[32px] font-bold text-text">${pricePerNight}</span>
                                <span className="text-[14px] font-medium text-zinc-500">/ night</span>
                                <span className="ml-2 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                                    Save ${discount}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-bold text-text">${regularPrice}</span>
                            <span className="text-[14px] font-medium text-zinc-500">/ night</span>
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-zinc-100 mb-6" />

            <form onSubmit={handleBook} className="space-y-4">
                {/* Dates Section */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="checkIn">Check-in</label>
                        <input
                            type="date"
                            id="checkIn"
                            min={today}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="checkOut">Check-out</label>
                        <input
                            type="date"
                            id="checkOut"
                            min={checkIn || tomorrow}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish"
                        />
                    </div>
                </div>

                {/* Guests Capacity */}
                <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="guests">Number of Guests</label>
                    <select
                        id="guests"
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish cursor-pointer"
                    >
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'guest' : 'guests'}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Customer Information */}
                <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-text uppercase tracking-wider mb-1.5" htmlFor="notes">Special Requests (Optional)</label>
                    <textarea
                        id="notes"
                        rows={2}
                        placeholder="e.g. early check-in, dietary restrictions..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-[13px] text-zinc-800 focus:outline-none focus:border-text focus:bg-white transition-all font-mulish resize-none"
                    />
                </div>

                {/* Dynamic pricing breakdown */}
                {nights > 0 && (
                    <div className="bg-amber-50/50 border border-amber-900/5 rounded-xl p-4 mt-6 space-y-2 text-[13px] font-mulish">
                        <div className="flex justify-between text-zinc-600">
                            <span>${pricePerNight} x {nights} nights</span>
                            <span className="font-semibold text-text">${pricePerNight * nights}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-emerald-700">
                                <span>Special Discount</span>
                                <span className="font-semibold">- ${discount * nights}</span>
                            </div>
                        )}
                        <div className="border-t border-dashed border-amber-900/10 my-2 pt-2 flex justify-between text-sm">
                            <span className="font-bold text-text">Total Price</span>
                            <span className="font-bold text-text">${totalPrice}</span>
                        </div>
                    </div>
                )}

                {/* Error message */}
                {errorMsg && (
                    <div className="text-[12px] font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5 text-center font-mulish">
                        {errorMsg}
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 mt-4 bg-text hover:bg-[#635334] text-white font-semibold rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-amber-900/10 hover:shadow-xl hover:shadow-amber-900/15 disabled:bg-zinc-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer font-poppins text-[14px]"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>Reserve Cabin</span>
                    )}
                </button>
            </form>

            <div className="text-center mt-4">
                <span className="text-[10px] text-zinc-400 font-mulish">You won't be charged yet</span>
            </div>
        </div>
    );
}
