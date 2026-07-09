"use client";

import { useState, useEffect } from "react";

type CabinDescriptionProps = {
    description: string;
};

export default function CabinDescription({ description }: CabinDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const fallbackDescription =
        "Indulge in absolute luxury and privacy in this meticulously designed cabin. Complete with state-of-the-art facilities, handcrafted local furniture, premium bedding, and a panoramic layout that brings the beauty of the surrounding wilderness directly to you.";

    const text = description || fallbackDescription;
    const isLong = text.length > 200;
    const displayText = isLong && !isExpanded ? text.slice(0, 200) + "..." : text;

    return (
        <div>
            <p className="text-[15px] leading-[1.85] text-white/60 font-mulish">
                {displayText}{" "}
                {isLong && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#c4a96a] hover:text-[#d4bc82] font-semibold transition-colors underline underline-offset-2 cursor-pointer text-[14px]"
                    >
                        {isExpanded ? "Show less" : "Show more"}
                    </button>
                )}
            </p>
        </div>
    );
}
