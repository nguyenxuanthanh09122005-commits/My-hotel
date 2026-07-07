import React from 'react'

export const BaseURL = process.env.NEXT_PUBLIC_API_URL || "https://the-wild-oasis-api.vercel.app/api";
export async function cabin() {
    const res = await fetch(`${BaseURL}/cabins`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    });
    const data = await res.json();
    return data;
}
export async function CabinId(id: string) {
    const res = await fetch(`${BaseURL}/cabins/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}
