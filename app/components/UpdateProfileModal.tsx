'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { AccountResponse } from '../types/AccountType'
import { updateGuestProfile } from '../lib/account'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

type UpdateProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    guest?: AccountResponse;
}


export default function UpdateProfileModal({ isOpen, onClose, guest }: UpdateProfileModalProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

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
                // Refresh to get the latest data
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
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="h-1.5 w-full bg-[#7C6A46]"></div>
            <div className="px-6 pt-5 pb-3 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold text-text uppercase tracking-widest block mb-1">Update Details</span>
                    <h2 className="text-xl font-extrabold text-text">Edit Profile</h2>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer text-xl"
                >
                    &times;
                </button>
            </div>

            <form onSubmit={handleSubmit} className="px-10 pb-10 pt-6 space-y-8">
                {/* Read-only fields */}
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                        <input
                            type="text"
                            disabled
                            defaultValue={guest?.fullName}
                            className="w-full px-5 py-3.5 bg-zinc-50/80 border border-zinc-100 rounded-xl text-base text-zinc-500 font-mulish cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                        <input
                            type="email"
                            disabled
                            defaultValue={guest?.email}
                            className="w-full px-5 py-3.5 bg-zinc-50/80 border border-zinc-100 rounded-xl text-base text-zinc-500 font-mulish cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="border-t border-zinc-100 my-8"></div>

                {/* Editable fields */}
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text uppercase tracking-widest" htmlFor="edit-nationalid">
                            National ID / Passport
                        </label>
                        <input
                            id="edit-nationalid"
                            type="text"
                            name="nationalID"
                            defaultValue={guest?.nationalID}
                            placeholder="e.g. 0123456789"
                            className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-text focus:ring-1 focus:ring-text transition-all font-mulish placeholder:text-zinc-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text uppercase tracking-widest" htmlFor="edit-nationality">
                                Nationality
                            </label>
                            <input 
                                id="edit-nationality"
                                type="text" 
                                name="nationality"
                                defaultValue={guest?.nationality}
                                placeholder="e.g. Vietnamese"
                                className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-text focus:ring-1 focus:ring-text transition-all font-mulish placeholder:text-zinc-300"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text uppercase tracking-widest" htmlFor="edit-countryflag">
                                Country Flag URL
                            </label>
                            <input 
                                id="edit-countryflag"
                                type="text" 
                                name="countryFlag"
                                defaultValue={guest?.countryFlag}
                                placeholder="https://..."
                                className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl text-base text-zinc-800 focus:outline-none focus:border-text focus:ring-1 focus:ring-text transition-all font-mulish placeholder:text-zinc-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-text hover:bg-[#635334] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/20 font-poppins text-base active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{loading ? "Saving Changes..." : "Save Profile"}</span>
                    </button>
                </div>
            </form>
        </Modal>
    )
}
