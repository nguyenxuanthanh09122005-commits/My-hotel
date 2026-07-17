"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FiltersType } from '../types/CabinType';

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    // Catch both capacity and capicity typos
    const raw = searchParams.get("capicity") || searchParams.get("capacity");
    const activeFilter = raw === "sm" || raw === "md" || raw === "lg" ? raw : "all";

    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const activeBtn = containerRef.current.querySelector(`[data-active="true"]`) as HTMLButtonElement;
        if (activeBtn) {
            setIndicatorStyle({
                left: activeBtn.offsetLeft,
                width: activeBtn.offsetWidth,
                opacity: 1
            });
        }
    }, [activeFilter, searchParams]);

    const updateFilters = (str: FiltersType) => {
        const params = new URLSearchParams(searchParams.toString());
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
        const base = "px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[14px] font-mulish font-semibold transition-colors duration-500 cursor-pointer relative z-10 rounded-lg whitespace-nowrap flex-shrink-0";
        const active = "text-white";
        const inactive = "text-text hover:text-[#635334]";
        return `${base} ${activeFilter === filter ? active : inactive}`;
    };

    return (
        <div ref={containerRef} className='relative flex justify-end bg-white border border-[#e2dcd0] rounded-xl p-1  sm:w-fit max-w-full overflow-x-auto font-medium mb-6 sm:mb-8 animate-fade-in shadow-sm scrollbar-hide'>
            {/* Sliding Indicator */}
            <div
                className="absolute top-1 bottom-1 bg-text rounded-lg shadow-sm transition-all duration-500 ease-out z-0"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />

            <button data-active={activeFilter === "all"} onClick={() => updateFilters("all")} className={btnClass("all")}>All cabins</button>
            <button data-active={activeFilter === "sm"} onClick={() => updateFilters("sm")} className={btnClass("sm")}>2-3 guests</button>
            <button data-active={activeFilter === "md"} onClick={() => updateFilters("md")} className={btnClass("md")}>4-7 guests</button>
            <button data-active={activeFilter === "lg"} onClick={() => updateFilters("lg")} className={btnClass("lg")}>8-12 guests</button>
        </div >
    )
}
