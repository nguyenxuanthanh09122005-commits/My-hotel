import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#FAFAFA]">
        <div className="container pt-10 pb-32 md:pb-40 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 z-10" data-aos="fade-right">
            <h1 className="text-5xl md:text-[64px] font-bold text-[#18181B] leading-[1.1] font-poppins">
              <span className=" italic text-[#7C6A46] text-[50px] md:text-5xl font-normal block mb-4 pb-[26px]">
                Paradise View
              </span>
              Hotel for every <br /> moment rich in <br /> emotion
            </h1>
            <div className="text-zinc-600 font-medium text-[15px] max-w-sm mt-2 pb-[35px]">
              Every moment feels like the first time <br /> in paradise view
            </div>
            <div className="flex items-center gap-[38px] text-[20px] font-medium ">
              <Link href="/cabins" className="bg-[#7C6A46] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#6b5b3c] transition-colors ">
                Book now
              </Link>
              <button className="flex items-center gap-[18px] font-semibold text-zinc-900 hover:text-[#7C6A46] transition-colors  group">
                <div className="w-12 h-12 bg-[#00B4A5] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <Image src="/icon_play.svg" alt="Play" width={14} height={14} />
                </div>
                Take a tour
              </button>
            </div>
          </div>
          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-end relative" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/banner_home.svg"
              alt="Hotel View"
              width={700}
              height={800}
              className="object-cover w-full max-w-[650px] h-auto"
              priority
            />
          </div>
        </div>
      </section>



      {/* Our Facilities Section */}
      <section className="container " data-aos="fade-up">
        <div className="pt-[63px] pb-[73px]">
          <div className="text-center flex flex-col font-medium pb-[49px] gap-[12px] ">
            <div className="text-[40px]  text-black mb-4 ">Our Facilities</div>
            <p className="text-black  text-[15px]">
              We offer modern (5 star) hotel facilities for your comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[51px]">
            {/* Facility Cards */}
            {[
              { icon: '/icon_swimmingpool.svg', label: 'Swimming Pool' },
              { icon: '/icon_wifi.svg', label: 'Wifi' },
              { icon: '/icon_breakfast.svg', label: 'Breakfast' },
              { icon: '/icon_gym.svg', label: 'Gym' },
              { icon: '/icon_game.svg', label: 'Game center' },
              { icon: '/icon_light.svg', label: '24/7 Light' },
              { icon: '/icon_laundry.svg', label: 'Laundry' },
              { icon: '/icon_parkingspace.svg', label: 'Parking Space' },
            ].map((facility, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-[#FAFAFA] hover:bg-[#7C6A46] rounded-sm aspect-square flex flex-col items-center justify-center p-6 transition-all duration-2000 ease-out delay-100 hover:shadow-lg  border border-transparent group"
              >
                <div className="mb-6 group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-1000 ease-out delay-100">
                  <Image src={facility.icon} alt={facility.label} width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-[#7C6A46] group-hover:text-white font-medium text-[15px] font-poppins text-center transition-colors duration-1000 ease-out delay-100">
                  {facility.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxurious Rooms Section */}
      <section className="relative font-raleway w-full pt-[27px] pb-[57px] bg-cover bg-center" style={{ backgroundImage: "url('/Hotelroomsbg.svg')" }} data-aos="fade-up">
        {/* Overlay */}
        <div className="container ">
          <div className="absolute inset-0 bg-[#7C6A46]/80"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex flex-col  items-center gap-[14px] font-medium pb-[71px]">
              <div className="text-4xl md:text-[50px]  text-white mb-6 ">Luxurious Rooms</div>
              <div className="w-24 h-1 bg-white mb-6"></div>
              <div className="text-white  text-[15px] mb-16">All room are design for your comfort</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl ">
              {/* Room Card 1 */}
              <div className="bg-white text-black rounded-xl p-4 gap-[15px] md:p-5 flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="100">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms1.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[17px] leading-snug ">
                  Television set, Extra sheets and Breakfast
                </div>
              </div>

              {/* Room Card 2 */}
              <div className="bg-white rounded-xl text-black  p-4 md:p-5 gap-[15px] flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="200">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms2.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[17px] leading-snug ">
                  Television set, Extra sheets, Breakfast, and
                  fireplace
                </div>
              </div>

              {/* Room Card 3 */}
              <div className="bg-white rounded-xl text-black  gap-[15px] p-4 md:p-5 flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="300">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms3.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[17px] leading-snug ">
                  Television set, Extra sheets, Breakfast, and fireplace, Console and bed rest
                </div>
              </div>
            </div>
          </div></div>
      </section>
    </div>
  );
}
