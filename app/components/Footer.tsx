import React from 'react'

export default function Footer() {
    return (
        <div className="pt-[81px] pb-[50px] w-full">
            <div className="container w-full ">
                <div className="w-full flex justify-between  items-start  ">
                    <div className="max-w-[277px] w-[277px]">
                        <h2 className="mb-[22px]">Paradise view</h2>
                        <p className="text-justify mt-[22px]">The service at the Hotel Monteleone was exceptional. Th
                            ere was absolutely no issue that was not addressed timely and with sati
                            sfactory results. We were particulary impressed with how the hotel staff anticipated
                            our needs (periodically coming by the Board Room to check with us)</p>
                    </div>
                    <div className="flex gap-[95px]">
                        <div className="li-footer">
                            <h3>Quick links</h3>
                            <ul>
                                <li><a href="#">Room booking</a></li>
                                <li><a href="#">Rooms</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Explore</a></li>
                            </ul>
                        </div>
                        <div className="li-footer">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Refund policy</a></li>
                                <li><a href="#">F.A.Q</a></li>
                                <li><a href="#">About</a></li>
                            </ul>
                        </div>
                        <div className="li-footer">
                            <h3>Social media</h3>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Linkedin</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-[360px] w-[360px] flex flex-col gap-[22px]">
                        <h3>Newsletter</h3>
                        <p className=" max-w-[234px] w-[234px] text-justify">Kindly subscribe to our newsletter to get
                            latest deals on our rooms and vacation
                            discount.</p>
                        <div className="relative flex items-center">

                            <input
                                className="bg-white w-full p-[18px] pr-[150px] text-black font-medium border border-gray-200"
                                type="text"
                                placeholder="Enter your email"
                            />

                            <button className=" rounded-[5px] absolute right-2 top-1/2 -translate-y-1/2 bg-text text-sm px-[25px] py-[13px] text-white font-semibold">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
