import { useState } from "react";
import email from "/icons/email.svg";
import instagram from "/icons/instagram.svg";
import vimeo from "/icons/vimeo.svg";
import banner from "/images/banner.png";

export default function Banner() {
    const [showVideoModal, setShowVideoModal] = useState(false);

    const toggleVideoModal = () => {
        setShowVideoModal(!showVideoModal);
    };

    return (
        <section
            id="demo-reel"
            className="relative h-2/5 max-h-[40%] min-h-[470px] w-full bg-[#ffffff1f] bg-cover bg-left-top hover:bg-blend-color-burn"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    onClick={toggleVideoModal} // Moved onClick here
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-24 w-24 text-white cursor-pointer"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 000 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
            </div>

            {showVideoModal && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={e => e.stopPropagation()}>
                    <div style={{ position: "relative", width: "60%", maxWidth: "900px" }}>
                        <div style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            cursor: "pointer",
                            color: "#FFF",
                            backgroundColor: "#333",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 51,
                        }} onClick={e => { e.stopPropagation(); setShowVideoModal(false); }}>
                            &times;
                        </div>
                        <div style={{ paddingTop: "56.25%", position: "relative" }}>
                            <iframe src="https://player.vimeo.com/video/920587179?badge=0&autopause=0&player_id=0&app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} title="Safe & Sound Demo Reel 2024"></iframe>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-5 flex h-12 w-[98%] justify-end gap-5">
                <a className="h-full w-12 select-none" href="https://www.instagram.com/safeandsoundpost/" target="_blank" rel="noopener noreferrer">
                    <img className="w-full" src={instagram} alt="Instagram" draggable="false" />
                </a>
                <a className="h-full w-12 select-none" href="mailto:safeandsoundpost@gmail.com">
                    <img className="w-full" src={email} alt="Email" draggable="false" />
                </a>
                <a className="h-full w-12 select-none" href="https://vimeo.com/839330843" target="_blank" rel="noopener noreferrer">
                    <img className="w-full" src={vimeo} alt="Vimeo" draggable="false" />
                </a>
            </div>
        </section>
    );
}
