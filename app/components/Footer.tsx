import React from 'react'

export default function Footer() {
    return (
        <div className="pt-10 md:pt-[81px] pb-10 md:pb-[50px] w-full">
            <div className="container w-full">
                <div className="w-full flex flex-row flex-wrap min-[1350px]:flex-nowrap justify-between items-start gap-y-12 lg:gap-x-4 min-[1350px]:gap-0">

                    {/* Column 1 */}
                    <div className="w-full md:w-[40%] min-[1350px]:w-auto min-[1350px]:max-w-[277px]">
                        <h2 className="mb-4 md:mb-[22px] text-xl md:text-2xl min-[1350px]:text-[30px] font-bold">N-HOME</h2>
                        <p className="text-justify mt-2 md:mt-[22px] text-[13px] md:text-[15px] min-[1350px]:text-[16px] opacity-90">
                            The service at the Hotel Monteleone was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particulary impressed with how the hotel staff anticipated our needs (periodically coming by the Board Room to check with us)
                        </p>
                    </div>

                    {/* Columns 2,3,4 */}
                    <div className="flex flex-wrap gap-8 md:gap-4 lg:gap-10 min-[1350px]:gap-[95px] w-full md:w-[55%] min-[1350px]:w-auto justify-between md:justify-between">
                        <div className="li-footer">
                            <h3 className="text-[15px] md:text-[17px] min-[1350px]:text-[20px] font-semibold mb-2">Quick links</h3>
                            <ul>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Room booking</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Rooms</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Contact</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Explore</a></li>
                            </ul>
                        </div>
                        <div className="li-footer">
                            <h3 className="text-[15px] md:text-[17px] min-[1350px]:text-[20px] font-semibold mb-2">Company</h3>
                            <ul>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Privacy policy</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Refund policy</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">F.A.Q</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">About</a></li>
                            </ul>
                        </div>
                        <div className="li-footer">
                            <h3 className="text-[15px] md:text-[17px] min-[1350px]:text-[20px] font-semibold mb-2">Social media</h3>
                            <ul>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Facebook</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Twitter</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Instagram</a></li>
                                <li><a href="#" className="text-[13px] md:text-[15px] hover:text-gray-300 transition-colors">Linkedin</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div className="w-full min-[1350px]:w-auto min-[1350px]:max-w-[360px] flex flex-col gap-4 md:gap-[22px] sm:mt-4 min-[1350px]:mt-0">
                        <h3 className="text-[15px] md:text-[17px] min-[1350px]:text-[20px] font-semibold">Newsletter</h3>
                        <p className="w-full min-[1350px]:max-w-[234px] text-left min-[1350px]:text-justify text-[13px] md:text-[15px] min-[1350px]:text-[16px] opacity-90">
                            Kindly subscribe to our newsletter to get latest deals on our rooms and vacation discount.
                        </p>
                        <div className="relative flex items-center w-full sm:max-w-[400px] min-[1350px]:max-w-full mt-2 min-[1350px]:mt-0">
                            <input
                                className="bg-white w-full p-4 md:p-[18px] pr-[130px] md:pr-[150px] text-black text-[13px] md:text-[15px] font-medium border border-gray-200 rounded-[5px]"
                                type="text"
                                placeholder="Enter your email"
                            />
                            <button className="rounded-[5px] absolute right-2 top-1/2 -translate-y-1/2 bg-text text-xs md:text-[15px] px-5 md:px-[25px] py-3 md:py-[13px] text-white font-semibold hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
