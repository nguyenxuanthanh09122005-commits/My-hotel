import { BookingRequest, UpdateBookingRequest } from "../types/BookingType";
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

export async function BookedDates(id: string) {
    const res = await fetch(`${BaseURL}/bookings/cabin/${id}/booked-dates`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}

export async function ListBooking(token: string) {
    const res = await fetch(`${BaseURL}/bookings/guest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },

        cache: "no-store"
    });
    const data = await res.json();
    return data;
}
export async function DetailBooking(token: string, id: string) {
    const res = await fetch(`${BaseURL}/bookings/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },

    });
    const data = await res.json();
    return data;
}
export async function UpdateBooking(token: string, id: string, formData: UpdateBookingRequest) {
    const res = await fetch(`${BaseURL}/bookings/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
}
export async function DeleteBooking(token: string, id: string) {
    const res = await fetch(`${BaseURL}/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}