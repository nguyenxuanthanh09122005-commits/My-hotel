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
            <div className='w-full h-auto max-h-[250px] overflow-hidden'>
                <Image src={item.image} alt="Room 1" width={800} height={400} className='w-full h-auto' />
            </div>
            <div className="flex items-center justify-between  w-full">
                <div>
                    <h2 className='font-semibold text-[25px]'>{item.name}</h2>
                </div>
                <div className='font-mulish text-[12px]'>MaxCapacity: {item.maxCapacity}</div>
            </div>
            <div className='font-medium text-[20px]'>{item.regularPrice}$/Day</div>
            <div><hr /></div>
            <div className='flex items-center justify-between gap-4 w-full'>
                <div className='flex gap-[27px]  icon'>
                    <div><Image src="/tv.svg" width={50} height={50} alt='tv' className='w-full h-auto ' /></div>
                    <div><Image src="/shower.svg" alt='shower' width={50} height={50} className='w-full h-auto' /></div>
                    <div><Image src="/wifi.svg" alt='wifi' width={50} height={50} className='w-full h-auto' /></div>
                </div>
                <div>
                    <Link href={`/cabins/${item.id}`} className='bg-text text-white px-[36px] py-[12px] text-[15px]'>Detail & Reservation</Link>
                </div>
            </div>
        </div>
    )
}
