'use client'

import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { AccountResponse } from '../types/AccountType'
import { updateGuestProfile } from '../lib/account'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'

type UpdateProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    guest?: AccountResponse;
}

export default function UpdateProfileModal({ isOpen, onClose, guest }: UpdateProfileModalProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    // Auto-update internal state when guest prop changes
    const [flagPreview, setFlagPreview] = useState(guest?.countryFlag || "");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFlagPreview(guest?.countryFlag || "");
    }, [guest]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nationalID = formData.get('nationalID') as string;
        const nationality = formData.get('nationality') as string;
        const countryFlag = formData.get('countryFlag') as string;

        if (!session?.accessToken) {
            toast.error("Vui lòng đăng nhập lại!");
            return;
        }

        const payload = {
            fullName: guest?.fullName || "",
            countryFlag: countryFlag || "",
            nationalID: nationalID,
            nationality: nationality
        };

        setLoading(true);
        try {
            const res = await updateGuestProfile(session.accessToken, payload);
            if (res) {
                toast.success("Cập nhật hồ sơ thành công!");
                onClose();
                window.location.reload();
            } else {
                toast.error("Cập nhật thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi hệ thống!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
            <div className="relative overflow-hidden p-0">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-r from-[#7C6A46] to-[#a08c62] z-0">
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="relative z-10 px-8 pt-8 pb-8 text-white flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl font-bold font-poppins shadow-lg overflow-hidden">
                        {session?.user?.image ? (
                            <Image src={session.user.image} width={50} height={50} className='w-full h-full object-cover rounded-2xl' alt='avatar' />
                        ) : (
                            <span className="text-white">U</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold font-poppins tracking-tight">Edit Profile</h2>
                        <p className="text-white/80 font-mulish text-sm mt-1">Ensure your details match your ID for a smooth check-in.</p>
                    </div>
                </div>

                <form autoComplete="off" onSubmit={handleSubmit} className="relative z-10 bg-white flex flex-col gap-2.5 rounded-t-3xl px-8 pt-8 pb-8 space-y-8 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">

                    {/* Section: Basic Info (Locked) */}
                    <div className=" flex flex-col gap-3 pt-2">
                        <div className="flex  items-center gap-3 mb-8">
                            <h3 className="text-[15px] font-bold text-text uppercase tracking-widest">Account Information</h3>
                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-10 pt-2">
                            <div className="relative">
                                <label className="absolute -top-3 left-3 bg-white px-2 text-[11px] font-bold text-zinc-400 uppercase tracking-widest z-10">Full Name</label>
                                <input
                                    type="text"
                                    disabled
                                    defaultValue={guest?.fullName}
                                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-base text-zinc-500 font-mulish cursor-not-allowed"
                                />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3 left-3 bg-white px-2 text-[11px] font-bold text-zinc-400 uppercase tracking-widest z-10">Email Address</label>
                                <input
                                    type="email"
                                    disabled
                                    defaultValue={guest?.email}
                                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-base text-zinc-500 font-mulish cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-zinc-100 my-4"></div>

                    {/* Section: Travel Details (Editable) */}
                    <div className='flex flex-col gap-5'>
                        <div className="flex items-center gap-3 mb-8">
                            <h3 className="text-[15px] font-bold text-text uppercase tracking-widest">Travel Details</h3>
                            <span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full">Required</span>
                        </div>

                        <div className=" flex flex-col gap-3 space-y-10 pt-2">
                            <div className="relative group">
                                <label className="absolute -top-3 left-3 bg-white px-2 text-[11px] font-bold text-text uppercase tracking-widest z-10 group-focus-within:text-[#7C6A46] transition-colors" htmlFor="edit-nationalid">
                                    National ID / Passport Number
                                </label>
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <svg className="h-6 w-6 text-zinc-400 group-focus-within:text-[#7C6A46] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                </div>
                                <input
                                    id="edit-nationalid"
                                    type="text"
                                    name="nationalID"
                                    autoComplete="off"
                                    defaultValue={guest?.nationalID || ''}
                                    placeholder="Enter your document number"
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-[#7C6A46] focus:ring-1 focus:ring-[#7C6A46] transition-all font-mulish placeholder:text-zinc-300"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-2">
                                <div className="relative group">
                                    <label className="absolute -top-3 left-3 bg-white px-2 text-[11px] font-bold text-text uppercase tracking-widest z-10 group-focus-within:text-[#7C6A46] transition-colors" htmlFor="edit-nationality">
                                        Nationality
                                    </label>
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <svg className="h-6 w-6 text-zinc-400 group-focus-within:text-[#7C6A46] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <input
                                        id="edit-nationality"
                                        type="text"
                                        name="nationality"
                                        autoComplete="off"
                                        defaultValue={guest?.nationality || ''}
                                        placeholder="e.g. Vietnamese"
                                        className="w-full pl-14 pr-5 py-4 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-[#7C6A46] focus:ring-1 focus:ring-[#7C6A46] transition-all font-mulish placeholder:text-zinc-300"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="absolute -top-3 left-3 bg-white px-2 text-[11px] font-bold text-text uppercase tracking-widest z-10 group-focus-within:text-[#7C6A46] transition-colors" htmlFor="edit-countryflag">
                                        Country Flag URL
                                    </label>
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
                                        {flagPreview ? (
                                            <div className="w-7 h-5 relative rounded-sm overflow-hidden border border-zinc-200 shadow-sm">
                                                <Image src={flagPreview} alt="flag" fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <svg className="h-6 w-6 text-zinc-400 group-focus-within:text-[#7C6A46] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        )}
                                    </div>
                                    <input
                                        id="edit-countryflag"
                                        type="text"
                                        name="countryFlag"
                                        autoComplete="off"
                                        defaultValue={guest?.countryFlag || ''}
                                        onChange={(e) => setFlagPreview(e.target.value)}
                                        placeholder="https://flagcdn.com/..."
                                        className="w-full pl-15 pr-5 py-4 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-[#7C6A46] focus:ring-1 focus:ring-[#7C6A46] transition-all font-mulish placeholder:text-zinc-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#7C6A46] to-[#635334] hover:from-[#635334] hover:to-[#4a3e26] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/20 font-poppins text-base active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving Profile...</span>
                                </>
                            ) : (
                                <>
                                    <span>Save Profile</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
