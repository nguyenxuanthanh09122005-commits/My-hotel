import { BookingRequest } from "../types/BookingType";
import { AccountResquest } from "../types/AccountType";
import { BaseURL } from "./cabin";

export async function getGuestProfile(token: string) {
    const res = await fetch(`${BaseURL}/guests/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
}
export async function updateGuestProfile(token: string, payload: AccountResquest) {
    const res = await fetch(`${BaseURL}/guests/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
}