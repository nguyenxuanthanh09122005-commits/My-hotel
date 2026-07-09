"use client"

import { DetailBooking, UpdateBooking } from "@/app/lib/booking";
import { BookingRessponse, UpdateBookingRequest } from "@/app/types/BookingType";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    const params = useParams();

    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [booking, setBooking] = useState<BookingRessponse>();

    // Khởi tạo state với cấu trúc của UpdateBookingRequest
    const [formData, setFormData] = useState<UpdateBookingRequest>({
        status: "",
        isPaid: false,
        hasBreakfast: false,
        observations: "",
        numGuests: 1,
        extrasPrice: 0,
        totalPrice: 0
    });

    const editId = params.editId;
    const id = editId?.toString();

    const loadData = async () => {
        if (!session?.accessToken || !id) return;
        setIsLoading(true);
        try {
            const res = await DetailBooking(session.accessToken, id);
            setBooking(res);

            // Chỉ cập nhật formData SAU KHI đã lấy được dữ liệu từ API
            // Giữ nguyên các thông tin khác, chỉ đưa observations và numGuests lên form
            setFormData({
                status: res.status,
                isPaid: res.isPaid,
                hasBreakfast: res.hasBreakfast,
                observations: res.observations || "",
                numGuests: res.numGuests || 1,
                extrasPrice: res.extrasPrice,
                totalPrice: res.totalPrice
            });
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải thông tin đặt phòng");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();

    }, [params, session?.accessToken]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.accessToken || !id) return;

        setIsUpdating(true);
        try {
            // formData lúc này đã chứa tất cả các fields giữ nguyên + numGuests, observations mới
            await UpdateBooking(session.accessToken, id, formData);
            toast.success("Cập nhật thành công!");
            router.push('/account/bookings');
        } catch (error) {
            console.error("Lỗi khi update:", error);
            toast.error("Đã có lỗi xảy ra khi lưu thay đổi");
        } finally {
            setIsUpdating(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="text-zinc-500 font-mulish animate-pulse">Loading booking details...</div>
            </div>
        );
    }

    if (!booking) {
        return <div className="text-center p-10 text-zinc-500 font-mulish">Booking not found.</div>;
    }

    // Giới hạn số khách tối đa theo sức chứa của phòng
    const maxCapacity = booking.cabins?.maxCapacity || 10;

    return (
        <div className='max-w-2xl mx-auto pb-10'>
            <h2 className="text-3xl font-extrabold text-text mb-8 font-poppins tracking-tight pb-[20px]">
                Edit Booking
            </h2>

            <div className="bg-white rounded-2xl p-8 border border-[#e2dcd0]/50 shadow-sm">
                <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                    {/* Chỉ hiển thị chỉnh sửa Số lượng khách */}
                    <div>
                        <label className="block text-text font-bold mb-2 font-poppins">
                            Number of guests
                        </label>
                        <select
                            value={formData.numGuests}
                            onChange={(e) => setFormData({ ...formData, numGuests: Number(e.target.value) })}
                            className="w-full p-3 border border-[#e2dcd0] rounded-xl text-zinc-800 font-mulish focus:outline-none focus:ring-2 focus:ring-[#7C6A46]/30 bg-[#faf8f5] transition-shadow"
                        >
                            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                                <option value={x} key={x}>
                                    {x} {x === 1 ? 'guest' : 'guests'}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-zinc-500 mt-2 font-mulish">
                            Maximum capacity for {booking.cabins?.name || "this cabin"} is {maxCapacity} guests.
                        </p>
                    </div>

                    {/* Chỉ hiển thị chỉnh sửa Ghi chú */}
                    <div>
                        <label className="block text-text font-bold mb-2 font-poppins">
                            Observations (Special Requests)
                        </label>
                        <textarea
                            value={formData.observations}
                            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            placeholder="Any special requests or observations..."
                            rows={4}
                            className="w-full p-3 border border-[#e2dcd0] rounded-xl text-zinc-800 font-mulish focus:outline-none focus:ring-2 focus:ring-[#7C6A46]/30 bg-[#faf8f5] resize-none transition-shadow"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-[#e2dcd0] text-zinc-500 hover:bg-[#faf8f5] font-semibold rounded-xl transition-all duration-300 font-poppins text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className={`px-8 py-3 bg-text hover:bg-[#635334] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/20 font-poppins text-sm flex items-center gap-2 ${isUpdating ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                        >
                            {isUpdating ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
