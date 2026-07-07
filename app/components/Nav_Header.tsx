import Image from 'next/image'
import Link from 'next/link'
import BoxLogin from './BoxLogin'

export default function Nav_Header() {
    return (

        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
            {/* 1. Phần Logo */}
            <div className="flex-shrink-0">
                <Link href="/home">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                </Link>
            </div>

            {/* 2. Phần Menu Link (Responsive: Ẩn trên Mobile cực nhỏ, hiện từ Máy tính bảng trở lên) */}
            <div className="hidden sm:block">
                <ul className="flex items-center gap-4 sm:gap-6 md:gap-[30px] lg:gap-[61px]">

                    <li><Link href="/home" className="text-black hover:text-text font-medium text-sm md:text-base">Home</Link></li>
                    <li><Link href="/about" className="text-black hover:text-text font-medium text-sm md:text-base">About</Link></li>
                    <li><Link href="/cabins" className="text-black hover:text-text font-medium text-sm md:text-base">Cabins</Link></li>
                    <li><Link href="/contact" className="text-black hover:text-text font-medium text-sm md:text-base">Contact</Link></li>
                </ul>
            </div>

            {/* 3. Phần Nút Action (Responsive: giảm padding trên màn hình nhỏ) */}
            <div className='flex  '>

                <BoxLogin />
            </div>
        </div>
    )
}
