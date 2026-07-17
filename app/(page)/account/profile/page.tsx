'use client'

import { getGuestProfile } from "@/app/lib/account";
import { AccountResponse } from "@/app/types/AccountType";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Modal from "@/app/components/Modal";
import UpdateProfileModal from "@/app/components/UpdateProfileModal";
export default function ProfilePage() {
    const { data: session } = useSession()
    console.log(session, "sssssssss");
    const token = session?.accessToken;
    const [loading, setLoading] = useState(false);
    const [guest, setGuest] = useState<AccountResponse>();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const loadData = async () => {
        setLoading(true);
        try {
            if (!session?.accessToken) return;
            const res = await getGuestProfile(session.accessToken);
            setGuest(res);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, [token])
    console.log(guest, "iiiiiiiiiiii");

    return (
        <div className="w-full  ">
            <div className="max-w-3xl w-full flex flex-col gap-4 sm:gap-5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-4 sm:mb-8 font-poppins tracking-tight">Profile Overview</h2>
                <div className="w-full flex justify-center " >
                    <div className="bg-white w-full rounded-3xl p-5 sm:p-8 md:p-10 border border-zinc-200 shadow-sm relative overflow-hidden">
                        {/* Decorative header strip */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#7C6A46]"></div>

                        {/* Small Edit Button at top right */}
                        <button
                            onClick={() => setIsEditOpen(true)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 text-zinc-400 hover:text-white hover:bg-[#7C6A46] rounded-full transition-all duration-300 shadow-sm"
                            title="Edit Profile"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>

                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-8 sm:mb-10 mt-6 sm:mt-2 text-center sm:text-left">
                            <div className="w-20 h-20 bg-[#faf8f5] rounded-full flex items-center justify-center text-3xl text-[#7C6A46] border border-[#e2dcd0]/50 font-poppins font-bold shadow-inner overflow-hidden flex-shrink-0">
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        width={100}
                                        height={100}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span>{guest?.fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
                                )}
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <h3 className="text-xl sm:text-2xl font-bold text-text font-poppins break-words">{guest?.fullName || 'Guest User'}</h3>
                                <p className="text-xs sm:text-sm text-zinc-500 font-mulish mt-0.5 break-all sm:break-normal">{guest?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 border-t border-zinc-100 pt-6 sm:pt-8">
                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-widest">National ID / Passport</span>
                                <span className="text-[14px] sm:text-[15px] font-medium text-zinc-800 font-mulish">
                                    {guest?.nationalID || <span className="text-zinc-400 italic">Not provided</span>}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Nationality</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] sm:text-[15px] font-medium text-zinc-800 font-mulish">
                                        {guest?.nationality || <span className="text-zinc-400 italic">Not provided</span>}
                                    </span>
                                    {guest?.countryFlag && (
                                        <Image
                                            src={guest.countryFlag}
                                            alt="Country Flag"
                                            width={24}
                                            height={16}
                                            className="rounded-sm object-cover shadow-sm border border-zinc-100"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-5 sm:pt-8 mt-5 sm:mt-8 border-t border-zinc-100">
                            <div className="text-[9px] sm:text-[10px] text-zinc-400 font-mulish uppercase tracking-widest flex flex-col sm:flex-row gap-3 sm:gap-8">
                                <p>Joined: <span className="font-semibold text-zinc-500">{guest?.createdAt ? new Date(guest.createdAt).toLocaleDateString('vi-VN') : '---'}</span></p>
                                <p>Last update: <span className="font-semibold text-zinc-500">{guest?.updatedAt ? new Date(guest.updatedAt).toLocaleDateString('vi-VN') : '---'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <UpdateProfileModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    guest={guest}
                />
            </div>
        </div>
    )
}
