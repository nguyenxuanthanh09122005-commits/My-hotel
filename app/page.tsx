import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#FAFAFA]">
        <div className="container pt-6 md:pt-10 pb-16 sm:pb-20 md:pb-32 lg:pb-40 flex flex-col md:flex-row items-center justify-between gap-10 sm:gap-12 md:gap-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6 z-10" data-aos="fade-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] min-[1300px]:text-[56px] font-bold text-[#18181B] leading-[1.4] sm:leading-[1.3] md:leading-[1.1] font-poppins px-2 sm:px-0">
              <span className="italic text-[#7C6A46] text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] min-[1300px]:text-[42px] font-normal block mb-2 sm:mb-2 md:mb-4 pb-1 sm:pb-2 md:pb-[26px]">
                N-Home
              </span>
              Hotel for every <br className="hidden md:block" /> moment rich in <br className="hidden md:block" /> emotion
            </h1>
            <div className="text-zinc-600 font-medium text-[13px] sm:text-sm md:text-[15px] max-w-sm mt-1 sm:mt-2 pb-2 sm:pb-4 md:pb-[35px] px-4 sm:px-0">
              Every moment feels like the first time <br className="hidden md:block" /> in N-Home
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-[38px] text-[15px] sm:text-base md:text-[20px] font-medium w-full sm:w-auto px-4 sm:px-0 mt-2 sm:mt-0">
              <div>
                <Link href="/cabins" className="w-full sm:w-auto bg-[#7C6A46] text-white px-8 py-3 md:py-3.5 rounded-full font-semibold hover:bg-[#6b5b3c] transition-colors text-center">
                  Book now
                </Link></div>
              <button className="flex w-full sm:w-auto justify-center items-center gap-3 md:gap-[18px] font-semibold text-zinc-900 hover:text-[#7C6A46] transition-colors group py-2 sm:py-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00B4A5] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
                  <Image src="/icon_play.svg" alt="Play" width={14} height={14} className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                Take a tour
              </button>
            </div>
          </div>
          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-2 sm:mt-4 md:mt-0 px-4 sm:px-0" data-aos="fade-left" data-aos-delay="200">
            <Image
              src="/banner_home.svg"
              alt="Hotel View"
              width={700}
              height={800}
              className="object-cover w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px] h-auto"
              priority
            />
          </div>
        </div>
      </section>



      {/* Our Facilities Section */}
      <section className="container " data-aos="fade-up">
        <div className="pt-[63px] pb-[73px]">
          <div className="text-center flex flex-col font-medium pb-[49px] gap-[12px] ">
            <div className="text-3xl sm:text-4xl lg:text-[40px] text-black mb-4 ">Our Facilities</div>
            <p className="text-black text-sm sm:text-[15px]">
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
                <span className="text-[#7C6A46] group-hover:text-white font-medium text-sm sm:text-[15px] font-poppins text-center transition-colors duration-1000 ease-out delay-100">
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
              <div className="text-3xl sm:text-4xl md:text-[50px] text-white mb-4 sm:mb-6 ">Luxurious Rooms</div>
              <div className="w-16 sm:w-24 h-1 bg-white mb-4 sm:mb-6"></div>
              <div className="text-white text-sm sm:text-[15px] mb-10 sm:mb-16">All room are design for your comfort</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl ">
              {/* Room Card 1 */}
              <div className="bg-white text-black rounded-xl p-4 gap-[15px] md:p-5 flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="100">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms1.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[15px] md:text-[17px] leading-snug ">
                  Television set, Extra sheets and Breakfast
                </div>
              </div>

              {/* Room Card 2 */}
              <div className="bg-white rounded-xl text-black  p-4 md:p-5 gap-[15px] flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="200">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms2.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[15px] md:text-[17px] leading-snug ">
                  Television set, Extra sheets, Breakfast, and
                  fireplace
                </div>
              </div>

              {/* Room Card 3 */}
              <div className="bg-white rounded-xl text-black  gap-[15px] p-4 md:p-5 flex flex-col shadow-xl" data-aos="fade-up" data-aos-delay="300">
                <div className="relative w-full aspect-[1.25] rounded-lg overflow-hidden mb-5">
                  <Image src="/luxury_rooms3.svg" alt="Room 3" fill className="object-cover" />

                </div>
                <div className=" text-[15px] md:text-[17px] leading-snug ">
                  Television set, Extra sheets, Breakfast, and fireplace, Console and bed rest
                </div>
              </div>
            </div>
          </div></div>
      </section>
    </div>
  );
}
