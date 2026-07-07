"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FiltersType } from '../types/CabinType';

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const raw = searchParams.get("capicity");

    const activeFilter = raw === "sm" || raw === "md" || raw === "lg" ? raw : "all";

    const updateFilters = (str: FiltersType) => {
        const params = new URLSearchParams(searchParams.toString());
        // Set both for safety, but primary to capacity
        if (str == "all") {
            params.delete("capacity");
            params.delete("capicity");
        } else {
            params.set("capacity", str);
            params.set("capicity", str);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const btnClass = (filter: FiltersType) => {
        const base = "px-5 py-2.5 text-[14px] font-mulish font-semibold transition-all cursor-pointer";
        const active = "bg-text text-white";
        const inactive = "hover:bg-[#7C6A46]/5 text-text";
        return `${base} ${activeFilter === filter ? active : inactive}`;
    };

    return (
        <div className='flex border border-[#e2dcd0] rounded-xl overflow-hidden w-fit divide-x divide-[#e2dcd0] font-medium bg-zinc-50/50 mb-8 animate-fade-in'>
            <button onClick={() => updateFilters("all")} className={btnClass("all")}>All cabins</button>
            <button onClick={() => updateFilters("sm")} className={btnClass("sm")}>2-3 guests</button>
            <button onClick={() => updateFilters("md")} className={btnClass("md")}>4-7 guests</button>
            <button onClick={() => updateFilters("lg")} className={btnClass("lg")}>8-12 guests</button>
        </div >
    )
}
