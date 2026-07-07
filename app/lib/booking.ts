import { BookingRequest } from "../types/BookingType";
import { BaseURL } from "./cabin";

export async function CreatBooking(token: string, Formdata: BookingRequest) {
    const res = await fetch(`${BaseURL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(Formdata),
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}