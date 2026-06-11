import { useState } from "react";
import { PiPlayCircleLight } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { RiVimeoLine } from "react-icons/ri";
import topDecorator from "../assets/images/symbols/top.png";

export default function Banner() {
    const [showVideoModal, setShowVideoModal] = useState(false);

    const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

    return (
        <section id="demo-reel" className="pointer-events-none relative mt-20 h-2/5 min-h-64 w-full md:mt-0 md:max-h-[40%] md:min-h-[470px] md:bg-left-top">

            <div className="pointer-events-auto absolute z-40 mt-5 hidden h-12 w-[98%] justify-end gap-5 md:flex">
                <a
                    className="text-primary hover:text-neutral pointer-events-auto h-full w-12 p-1 transition-colors select-none"
                    href="https://www.instagram.com/safeandsoundpost/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsInstagram className="size-full" />
                </a>
                <a
                    className="text-primary hover:text-neutral pointer-events-auto h-full w-12 transition-colors select-none"
                    href="mailto:safeandsoundpost@gmail.com"
                >
                    <MdOutlineEmail className="size-full" />
                </a>
                <a
                    className="text-primary hover:text-neutral pointer-events-auto h-full w-12 transition-colors select-none"
                    href="https://vimeo.com/user214948086"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <RiVimeoLine className="size-full" />
                </a>
            </div>

            <div className="relative flex h-full min-h-64 flex-col">
                <div className="pointer-events-none relative flex h-full max-h-fit flex-col">
                    <div className="pointer-events-auto h-full transition-all hover:opacity-80">
                        <img
                            className="-z-20 clear-left h-full max-h-[450px] min-h-64 w-[100vw] bg-[#ffffff1f] object-cover transition-all"
                            style={{ filter: "url(#film-grain)" }}
                            src="/images/banner-loveme.jpg"
                            alt="Background Image"
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
                        <PiPlayCircleLight
                            onClick={toggleVideoModal}
                            className="pointer-events-auto h-24 w-24 cursor-pointer text-white transition-all hover:scale-125"
                            strokeWidth={5}
                        />
                    </div>
                    <img className="absolute right-0 bottom-0 z-10 w-5/12 translate-y-[calc(66.48%+0.5px)] md:w-4/12 2xl:w-3/12" src={topDecorator} alt="Top decorator" />
                </div>
                <div
                    className={`bg-opacity-75 pointer-events-auto absolute inset-0 top-0 right-0 bottom-0 left-0 z-50 flex max-w-full items-center justify-center bg-black ${showVideoModal ? "animate-fade animate-once animate-duration-[2000ms] animate-ease-in" : "hidden"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative aspect-video w-full md:h-full md:w-fit">
                        <div
                            className="pointer-events-auto absolute top-2 right-12 z-50 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowVideoModal(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.4" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 h-full w-full"
                                title="Safe & Sound Demo Reel 2024"
                                src="https://player.vimeo.com/video/1108930922?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp"
                                width="640"
                                height="360"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
