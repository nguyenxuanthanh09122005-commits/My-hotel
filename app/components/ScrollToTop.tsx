'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Tự động cuộn lên đầu trang mỗi khi URL pathname thay đổi
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}
