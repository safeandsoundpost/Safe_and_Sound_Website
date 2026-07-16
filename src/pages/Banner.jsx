import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Hls from "hls.js";
import { PiPlayCircleLight } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { RiVimeoLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const STREAM_HOST = "https://customer-542wgslfba2pjmw7.cloudflarestream.com";
// Background loop (16:9 for landscape, 9:16 recut for portrait phones) and
// the click-to-watch demo reel are different videos.
const BACKGROUND_VIDEO_ID = "55fb47c7ee839d7eda6700bfcddc9ec3";
const BACKGROUND_PORTRAIT_VIDEO_ID = "0eb1a7df3460bed74630dba67a4a9d2f";
const REEL_VIDEO_ID = "cfb819d9ba65eed4b337f0bd248149d1";
// clientBandwidthHint=8 makes Stream serve a manifest with only the highest
// rendition — the iframe player has no quality control, so the background
// plays the raw HLS stream in a native <video> instead.
const backgroundSrc = (id) => `${STREAM_HOST}/${id}/manifest/video.m3u8?clientBandwidthHint=8`;
// The reel plays in a native <video> (not the Cloudflare iframe): mobile
// browsers only allow sound + fullscreen when triggered synchronously from
// the tap, which an embedded iframe can't do. Pinned to max quality.
const REEL_SRC = `${STREAM_HOST}/${REEL_VIDEO_ID}/manifest/video.m3u8?clientBandwidthHint=8`;

export default function Banner() {
    const [showReel, setShowReel] = useState(false);
    // Sizzle-first load: overlay UI stays hidden until the background video
    // renders its first frame, then fades in (NavBar listens for the event).
    const [live, setLive] = useState(false);
    const playerRef = useRef(null);
    const backgroundRef = useRef(null);
    const reelRef = useRef(null);
    const reelHlsRef = useRef(null);

    // Everything here must run synchronously inside the tap: mobile browsers
    // only honour play()-with-sound and fullscreen during a user gesture.
    const openReel = () => {
        const video = reelRef.current;
        if (!video) return;
        // flushSync so the overlay is actually visible (display: flex) before
        // the fullscreen request — fullscreen on a hidden element is refused.
        flushSync(() => setShowReel(true));

        if (!reelHlsRef.current && !video.src) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(REEL_SRC);
                hls.attachMedia(video);
                reelHlsRef.current = hls;
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = REEL_SRC;
            }
        }
        video.play().catch(() => {});

        // Fullscreen our own overlay where the API exists (desktop, Android —
        // which also honours the landscape lock). iPhones have no element
        // fullscreen, so the only browser-chrome-free player there is Apple's
        // native one — it letterboxes until the phone physically rotates.
        const el = playerRef.current;
        if (el && typeof el.requestFullscreen === "function") {
            el.requestFullscreen()
                .then(() => {
                    if (screen.orientation && typeof screen.orientation.lock === "function") {
                        return screen.orientation.lock("landscape");
                    }
                })
                .catch(() => {});
        } else if (typeof video.webkitEnterFullscreen === "function") {
            const enterNative = () => {
                try {
                    video.webkitEnterFullscreen();
                } catch {
                    /* ignore */
                }
            };
            if (video.readyState >= 1) enterNative();
            else video.addEventListener("loadedmetadata", enterNative, { once: true });
        }
    };

    const closeReel = () => {
        reelRef.current?.pause();
        setShowReel(false);
    };

    useEffect(() => {
        const video = backgroundRef.current;
        if (!video) return;

        const goLive = () => {
            setLive(true);
            window.dispatchEvent(new Event("sizzle-live"));
        };
        video.addEventListener("playing", goLive, { once: true });
        // if autoplay is blocked (e.g. low-power mode), reveal the UI anyway
        const liveFallback = setTimeout(goLive, 3000);

        // The `loop` attribute handles the wrap at the true end of the video.
        // HLS playback can stall at the boundary instead of looping, so a
        // watchdog restarts it only if the clock stops advancing near the end
        // — intervening any earlier makes the loop visibly abrupt.
        const restart = () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        };
        video.addEventListener("ended", restart);

        let lastTime = -1;
        const stallWatch = setInterval(() => {
            if (!video.duration) return;
            const nearEnd = video.duration - video.currentTime < 3;
            if (nearEnd && video.currentTime === lastTime) restart();
            lastTime = video.currentTime;
        }, 1000);

        // Prefer hls.js over native HLS: recent Chrome claims native HLS
        // support but stalls at the end of the stream instead of looping.
        // Native is the fallback for iOS Safari, where hls.js can't run.
        // Portrait screens get the 9:16 recut; rotating reloads the right one.
        let hls;
        const portraitQuery = window.matchMedia("(orientation: portrait)");
        const loadBackground = () => {
            const src = backgroundSrc(portraitQuery.matches ? BACKGROUND_PORTRAIT_VIDEO_ID : BACKGROUND_VIDEO_ID);
            hls?.destroy();
            hls = undefined;
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src;
                video.play().catch(() => {});
            }
        };
        loadBackground();
        portraitQuery.addEventListener("change", loadBackground);

        return () => {
            clearTimeout(liveFallback);
            video.removeEventListener("playing", goLive);
            clearInterval(stallWatch);
            video.removeEventListener("ended", restart);
            portraitQuery.removeEventListener("change", loadBackground);
            hls?.destroy();
        };
    }, []);

    // Close the overlay when fullscreen exits (desktop/Android), and when the
    // iOS native player is dismissed; pause playback whenever it closes.
    useEffect(() => {
        const video = reelRef.current;
        if (!showReel) {
            video?.pause();
            return;
        }

        const onFsChange = () => {
            if (!document.fullscreenElement) setShowReel(false);
        };
        const onIosEnd = () => setShowReel(false);
        document.addEventListener("fullscreenchange", onFsChange);
        video?.addEventListener("webkitendfullscreen", onIosEnd);
        return () => {
            document.removeEventListener("fullscreenchange", onFsChange);
            video?.removeEventListener("webkitendfullscreen", onIosEnd);
            try {
                screen.orientation?.unlock?.();
            } catch {
                /* not supported */
            }
            if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        };
    }, [showReel]);

    useEffect(() => () => reelHlsRef.current?.destroy(), []);

    return (
        <section id="demo-reel" className="relative h-screen w-full overflow-hidden">
            {/* Full-bleed background video. The iframe is oversized and centered so it
                behaves like object-fit: cover regardless of viewport aspect ratio. */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <video
                    ref={backgroundRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    aria-hidden="true"
                    tabIndex={-1}
                ></video>
            </div>

            {/* Dim overlay so the header and content stay legible */}
            <div className={`pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}></div>

            {/* Watch the reel with sound */}
            <div className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-500 ${live ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                <button
                    className="group flex cursor-pointer flex-col items-center gap-2 text-white"
                    onClick={openReel}
                    aria-label="Watch the demo reel"
                >
                    <PiPlayCircleLight className="h-24 w-24 transition-all group-hover:scale-125 md:h-28 md:w-28" strokeWidth={5} />
                    <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80 transition-opacity group-hover:opacity-100">
                        watch reel
                    </span>
                </button>
            </div>

            {/* Social links: mobile only — on desktop they live in the fixed header. */}
            <div className={`absolute right-5 bottom-6 z-40 flex gap-4 transition-opacity duration-500 md:hidden ${live ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                <a
                    className="text-primary hover:text-secondary h-9 w-9 transition-colors select-none md:h-10 md:w-10"
                    href="https://www.instagram.com/safeandsoundpost/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <BsInstagram className="size-full" />
                </a>
                <a
                    className="text-primary hover:text-secondary h-9 w-9 transition-colors select-none md:h-10 md:w-10"
                    href="mailto:safeandsoundpost@gmail.com"
                    aria-label="Email"
                >
                    <MdOutlineEmail className="size-full" />
                </a>
                <a
                    className="text-primary hover:text-secondary h-9 w-9 transition-colors select-none md:h-10 md:w-10"
                    href="https://vimeo.com/user214948086"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Vimeo"
                >
                    <RiVimeoLine className="size-full" />
                </a>
            </div>

            {/* Full-screen reel player — always mounted so the tap handler can
                drive play()/fullscreen synchronously (mobile gesture rules) */}
            <div ref={playerRef} className={`fixed top-0 left-0 z-[100] h-dvh w-screen items-center justify-center bg-black ${showReel ? "flex" : "hidden"}`}>
                <button
                    className="absolute top-4 right-4 z-[110] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
                    onClick={closeReel}
                    aria-label="Close the demo reel"
                >
                    <IoClose className="size-6" />
                </button>
                <video ref={reelRef} className="aspect-video max-h-full w-full max-w-full" controls playsInline preload="none"></video>
            </div>
        </section>
    );
}
