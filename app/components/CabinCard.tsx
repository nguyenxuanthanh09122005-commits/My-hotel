import Image from 'next/image'
import { CabinResponse } from '../types/CabinType';
import Link from 'next/link';
export type CabinCardProps = {
    item: CabinResponse;
}
export default function CabinCard(props: CabinCardProps) {
    const { item } = props;
    console.log(item.image, "image");

    return (
        <div className="flex flex-col text-text gap-[20px]">
            <div className='w-full h-[250px] md:h-[200px] overflow-hidden'>
                <Image src={item.image} alt={item.name} width={800} height={400} className='w-full h-full object-cover' />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1 sm:gap-0">
                <div>
                    <h2 className='font-semibold text-xl sm:text-[25px]'>{item.name}</h2>
                </div>
                <div className='font-mulish text-xs sm:text-[12px] text-gray-500 sm:text-text'>MaxCapacity: {item.maxCapacity}</div>
            </div>
            <div className='font-medium text-lg sm:text-[20px]'>{item.regularPrice}$/Night</div>
            <div><hr /></div>
            <div className='flex flex-col 2xl:flex-row items-start 2xl:items-center justify-between gap-4 w-full'>
                <div className='flex gap-4 sm:gap-6 icon'>
                    <div className="w-8 sm:w-10 2xl:w-[50px]"><Image src="/tv.svg" width={50} height={50} alt='tv' className='w-full h-auto' /></div>
                    <div className="w-8 sm:w-10 2xl:w-[50px]"><Image src="/shower.svg" alt='shower' width={50} height={50} className='w-full h-auto' /></div>
                    <div className="w-8 sm:w-10 2xl:w-[50px]"><Image src="/wifi.svg" alt='wifi' width={50} height={50} className='w-full h-auto' /></div>
                </div>
                <div className="w-full 2xl:w-auto mt-2 2xl:mt-0">
                    <Link href={`/cabins/${item.id}`} className='bg-text hover:bg-[#635334] text-white px-4 2xl:px-[36px] py-3 2xl:py-[12px] text-sm 2xl:text-[15px] transition-all duration-300 hover:shadow-lg active:scale-95 flex justify-center items-center rounded-sm w-full 2xl:w-auto'>Detail & Reservation</Link>
                </div>
            </div>
        </div>
    )
}
