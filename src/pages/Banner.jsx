import { useState } from "react";
import { PiPlayCircleLight } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { RiVimeoLine } from "react-icons/ri";
import banner from "/images/banner.webp";
import topDecorator1 from "../assets/images/symbols/top-1.png";
import topDecorator2 from "../assets/images/symbols/top-2.png";

export default function Banner() {
    const [showVideoModal, setShowVideoModal] = useState(false);

    const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

    return (
        <section
            id="demo-reel"
            className="pointer-events-none relative mt-20 h-2/5 min-h-64 w-full md:mt-0 md:max-h-[40%] md:min-h-[470px] md:bg-left-top"
        >
            {showVideoModal && (
                <div
                    className="pointer-events-auto absolute inset-0 z-50 flex max-w-full items-center justify-center bg-black bg-opacity-75"
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
                        </div>
                    </div>
                </div>
            )}

            <div className="pointer-events-auto absolute z-40 mt-5 hidden h-12 w-[98%] justify-end gap-5 md:flex">
                <a
                    className="pointer-events-auto h-full w-12 select-none p-1 text-primary transition-colors hover:text-neutral"
                    href="https://www.instagram.com/safeandsoundpost/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsInstagram className="size-full" />
                </a>
                <a
                    className="pointer-events-auto h-full w-12 select-none text-primary transition-colors hover:text-neutral"
                    href="mailto:safeandsoundpost@gmail.com"
                >
                    <MdOutlineEmail className="size-full" />
                </a>
                <a
                    className="pointer-events-auto h-full w-12 select-none text-primary transition-colors hover:text-neutral"
                    href="https://vimeo.com/user214948086"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <RiVimeoLine className="size-full" />
                </a>
            </div>

            <div className="flex min-h-64 flex-col">
                <div className="pointer-events-none relative flex max-h-fit flex-col">
                    <div className="pointer-events-auto transition-all hover:opacity-80">
                        <img
                            className="-z-20 clear-left max-h-[450px] min-h-80 w-[100vw] bg-[#ffffff1f] object-cover transition-all"
                            src={banner}
                            alt="Background Image"
                        />
                    </div>
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                        <PiPlayCircleLight
                            onClick={toggleVideoModal}
                            className="h-24 w-24 pointer-events-auto cursor-pointer text-white transition-all hover:scale-125"
                            strokeWidth={5}
                        />
                    </div>
                    <img
                        className="absolute bottom-0 right-0 z-10 max-h-fit w-5/12 md:w-4/12 2xl:w-3/12"
                        src={topDecorator1}
                        alt="Top decorator"
                    />
                </div>
                <div className="min-h-fit w-full">
                    <img
                        className="ml-auto max-h-fit w-5/12 md:w-4/12 2xl:w-3/12"
                        src={topDecorator2}
                        alt="Top decorator"
                    />
                </div>
            </div>
        </section>
    );
}
