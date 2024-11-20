import { useState } from "react";
import email from "/icons/email.svg";
import instagram from "/icons/instagram.svg";
import vimeo from "/icons/vimeo.svg";
import banner from "/images/banner.png";
import topDecorator from "../assets/images/symbols/top.png";

export default function Banner() {
    const [showVideoModal, setShowVideoModal] = useState(false);

    const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

    return (
        <section
            id="demo-reel"
            className="relative mt-[72px] h-2/5 min-h-48 w-full bg-[#ffffff1f] bg-cover bg-center hover:bg-blend-color-burn md:mt-0 md:max-h-[40%] md:min-h-[470px] md:bg-left-top"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    onClick={toggleVideoModal}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-24 w-24 cursor-pointer text-white"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 000 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                </svg>
            </div>

            {showVideoModal && (
                <div
                    className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative aspect-video w-full md:h-full md:w-fit">
                        <div
                            className="pointer-events-auto absolute right-12 top-2 z-50 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowVideoModal(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.4"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute left-0 top-0 h-full w-full"
                                title="Safe & Sound Demo Reel 2024"
                                src="https://player.vimeo.com/video/920587179?h=5e65119881"
                                width="640"
                                height="360"
                                frameBorder="0"
                                allowfullscreen
                            ></iframe>
                            {/* <iframe
                                src="https://player.vimeo.com/video/920587179?badge=0&autopause=0&player_id=0&app_id=58479"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                                className="absolute left-0 top-0 h-full w-full"
                                title="Safe & Sound Demo Reel 2024"
                            /> */}
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute mt-5 hidden h-12 w-[98%] justify-end gap-5 md:flex">
                <a
                    className="h-full w-12 select-none"
                    href="https://www.instagram.com/safeandsoundpost/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="w-full"
                        src={instagram}
                        alt="Instagram"
                        draggable="false"
                    />
                </a>
                <a
                    className="h-full w-12 select-none"
                    href="mailto:safeandsoundpost@gmail.com"
                >
                    <img
                        className="w-full"
                        src={email}
                        alt="Email"
                        draggable="false"
                    />
                </a>
                <a
                    className="h-full w-12 select-none"
                    href="https://vimeo.com/user214948086"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="w-full"
                        src={vimeo}
                        alt="Vimeo"
                        draggable="false"
                    />
                </a>
            </div>

            <img
                className="absolute right-0 top-[84.5%] max-md:w-2/4 md:top-[87%] md:-right-[8%] lg:right-0"
                src={topDecorator}
            />
        </section>
    );
}
