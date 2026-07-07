'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { CabinResponse } from '../types/CabinType'
import BookingModal from './BookingModal'
import LoginModal from './LoginModal'

type BoxReservationProps = {
    cabin: CabinResponse;
}

export default function Box_Reservation({ cabin }: BoxReservationProps) {
    const { data: session, status } = useSession()
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const handleButtonClick = () => {
        if (status === 'authenticated' && session?.accessToken) {
            setIsBookingOpen(true)
        } else {
            setIsLoginOpen(true)
        }
    }

    return (
        <>
            <button 
                onClick={handleButtonClick}
                className="bg-[#7C6A46] hover:bg-[#8d7a54] text-white px-8 py-3.5 font-semibold text-[14px] transition-all shadow-lg shadow-black/20 active:scale-[0.97] cursor-pointer"
            >
                Reservation
            </button>

            {/* Booking Modal (if logged in) */}
            {status === 'authenticated' && session?.accessToken && (
                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    cabin={cabin}
                    token={session.accessToken}
                />
            )}

            {/* Login Prompt Modal (if not logged in) */}
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
        </>
    )
}
