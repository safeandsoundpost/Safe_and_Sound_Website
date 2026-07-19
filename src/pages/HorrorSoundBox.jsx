import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";
import { PiPlayCircleLight } from "react-icons/pi";
import boxPhoto from "../assets/images/horror-box/box.webp";
import { hasSound, playSound, stopAll } from "../utils/horrorBoxAudio";

const STREAM_HOST = "https://customer-542wgslfba2pjmw7.cloudflarestream.com";
const DEMO_VIDEO_ID = "6f730e381652629067251e2d51cf0b4f";
// Native <video> + hls.js rather than the Cloudflare iframe, matching Banner:
// mobile only grants sound synchronously from the tap, which an iframe cannot
// do. clientBandwidthHint pins the manifest to the top rendition.
const DEMO_SRC = `${STREAM_HOST}/${DEMO_VIDEO_ID}/manifest/video.m3u8?clientBandwidthHint=8`;
// The reel opens on a title card, so the poster is pulled from 30s in, where
// the instrument and a pair of hands are actually in frame.
const DEMO_POSTER = `${STREAM_HOST}/${DEMO_VIDEO_ID}/thumbnails/thumbnail.jpg?time=30s&height=960`;

// Build photos, in rough construction order: bare crate, carcass and wiring,
// rail on plywood, stained, rods in. Reorder here to reorder the grid.
const buildPhotos = Object.entries(import.meta.glob("../assets/images/horror-box/build/*.webp", { eager: true, query: "?url" }))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

function DemoVideo() {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => () => hlsRef.current?.destroy(), []);

    // Everything here runs synchronously inside the click so the browser
    // treats playback with sound as user-initiated.
    const start = () => {
        const video = videoRef.current;
        if (!video) return;
        setStarted(true);

        if (!hlsRef.current && !video.src) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(DEMO_SRC);
                hls.attachMedia(video);
                hlsRef.current = hls;
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = DEMO_SRC;
            }
        }
        video.play().catch(() => {});
    };

    // The source is 1080x1920. On desktop the height is driven off the viewport
    // and the width follows from the aspect ratio, so the whole vertical frame
    // is visible at once instead of running past the fold.
    return (
        <div className="relative mx-auto aspect-[9/16] w-[min(360px,42vh)] max-w-full bg-black lg:h-[70vh] lg:w-auto">
            <video ref={videoRef} className="h-full w-full" poster={DEMO_POSTER} preload="none" playsInline controls={started} />
            {!started && (
                <button
                    type="button"
                    onClick={start}
                    aria-label="Play the Horror Box demo"
                    className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/25 transition-colors hover:bg-black/10"
                >
                    <PiPlayCircleLight className="size-20 text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110 md:size-28" />
                </button>
            )}
        </div>
    );
}

// A/B player for one scene. Switching version keeps the playhead and the
// play/pause state, so the comparison is the sound changing under the same
// frame rather than two clips starting over.
function ScenePlayer({ scene }) {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const [version, setVersion] = useState("box");
    const [started, setStarted] = useState(false);

    useEffect(() => () => hlsRef.current?.destroy(), []);

    const load = (id, { seek = 0, play = false } = {}) => {
        const video = videoRef.current;
        if (!video) return;
        const src = streamSrc(id);

        hlsRef.current?.destroy();
        hlsRef.current = null;

        const resume = () => {
            if (seek) video.currentTime = seek;
            if (play) video.play().catch(() => {});
        };

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, resume);
            hlsRef.current = hls;
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
            video.addEventListener("loadedmetadata", resume, { once: true });
        }
    };

    // Runs inside the click so mobile grants playback with sound.
    const start = () => {
        setStarted(true);
        load(scene[version], { play: true });
    };

    const swap = (next) => {
        if (next === version) return;
        setVersion(next);
        if (!started) return;
        const video = videoRef.current;
        load(scene[next], { seek: video?.currentTime || 0, play: video ? !video.paused : false });
    };

    const tab = (key) =>
        `flex-1 cursor-pointer border-2 border-black px-3 py-2 text-[11px] font-bold tracking-[.2rem] uppercase transition-colors ${
            version === key ? "bg-black text-[#f3f3f4]" : "bg-transparent text-black hover:bg-black/10"
        }`;

    return (
        <div>
            <h3 className={`${heading} mb-3.5 text-2xl`}>{scene.title}</h3>
            <div className="relative aspect-video w-full bg-black">
                <video
                    ref={videoRef}
                    className="h-full w-full"
                    poster={`${STREAM_HOST}/${scene.mix}/thumbnails/thumbnail.jpg?time=2s&height=720`}
                    preload="none"
                    playsInline
                    controls={started}
                />
                {!started && (
                    <button
                        type="button"
                        onClick={start}
                        aria-label={`Play the ${scene.title} comparison`}
                        className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/25 transition-colors hover:bg-black/10"
                    >
                        <PiPlayCircleLight className="size-16 text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110" />
                    </button>
                )}
            </div>
            <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => swap("box")} className={tab("box")} aria-pressed={version === "box"}>
                    from the box
                </button>
                <button type="button" onClick={() => swap("mix")} className={tab("mix")} aria-pressed={version === "mix"}>
                    in the mix
                </button>
            </div>
        </div>
    );
}

ScenePlayer.propTypes = { scene: PropTypes.object.isRequired };

// Positions are percentages of the photo, measured against box.webp. Nudge
// x/y here; the rings and the caption cards both read from this list.
const HOTSPOTS = [
    {
        id: "rodThin",
        x: 64,
        y: 27,
        label: "Thin brass rod",
        title: "Thin brass rod",
        text: "Struck brass. The first ping that tells you the room is not empty.",
    },
    {
        id: "rodMedium",
        x: 68.2,
        y: 22.3,
        label: "Medium brass rod",
        title: "Medium brass rod",
        text: "The middle rod, where most of the melodic work happens.",
    },
    { id: "rodThick", x: 59.3, y: 33.3, label: "Thick brass rod", title: "Thick brass rod", text: "The low rod. Slower to speak, and it hangs in the air." },
    {
        id: "coil",
        x: 76.4,
        y: 10.8,
        label: "Metal Coil",
        title: "Metal Coil",
        text: "Bowed coil. A shimmer that sits under dialogue without ever naming itself.",
    },
    {
        id: "chamber",
        x: 58.3,
        y: 50.5,
        label: "Reverb Tank",
        title: "Reverb Tank",
        text: "The reverb tank. Activated with an e-bow or by striking it with your fingers or objects.",
    },
    { id: "loop", x: 76.6, y: 60.6, label: "Metal Fixture", title: "Metal Fixture", text: "A metal fixture that allows for low resonant bowed drones." },
    { id: "tongs", x: 88, y: 52, label: "Bamboo tongs", title: "Bamboo tongs", text: "Dry wood. Clacks that an audience hears as footsteps, or as bone." },
    { id: "ruler", x: 46.2, y: 84.5, label: "Steel ruler", title: "Steel ruler", text: "Sprung steel. A twang that bends as it falls away." },
    { id: "skewer", x: 27.1, y: 84.6, label: "Metal skewer", title: "Metal skewer", text: "Thin steel. A ping with a long tail that refuses to settle." },
    {
        id: "doorstop",
        x: 74.3,
        y: 30.4,
        label: "Spring door stop",
        title: "Spring door stop",
        text: "The doorstop boing, pitched down until it stops being funny.",
    },
    { id: "rustyCoil", x: 82, y: 30.6, label: "Rusty coil", title: "Rusty coil", text: "Rust and tension. A scrape that sets teeth on edge." },
    {
        id: "body",
        x: 80.6,
        y: 76,
        label: "The Body",
        title: "The Body",
        text: "The case itself, played like a drum. A hollow knock under everything. A versatile part of the instrument as you can scrape or hit anything you can imagine on its surface.",
    },
];

// Two scenes, each with the box pass and the finished mix of the same cut.
// Scene naming and which id is which version are the client's to confirm.
const SCENES = [
    { title: "Do You See Her", box: "4dd8d4b0f36b57dd25d32c352ab7976c", mix: "31da0de4047dcc1ec4cc45929c028c04" },
    { title: "You Are Here", box: "f6f4d9b502b960da13d63c84a5afaaf1", mix: "f7a9345378712790b5788568bd85b8ad" },
];

const streamSrc = (id) => `${STREAM_HOST}/${id}/manifest/video.m3u8?clientBandwidthHint=8`;

const eyebrow = "text-accent text-xs font-bold tracking-[.2rem] uppercase";
const heading = "font-bold uppercase italic leading-none";

function Hotspot({ spot, playing, picking, onPlay, onGrab }) {
    return (
        <button
            type="button"
            className={`group absolute z-30 -mt-[23px] -ml-[23px] size-[46px] ${picking ? "cursor-grab touch-none active:cursor-grabbing" : "cursor-pointer"}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={`Play ${spot.label}`}
            onPointerDown={onGrab}
            onClick={onPlay}
        >
            <span
                className="border-secondary pointer-events-none absolute inset-[11px] animate-ping rounded-full border-2 [animation-duration:3.4s] motion-reduce:animate-none"
                aria-hidden="true"
            />
            <span
                className={`absolute inset-[11px] rounded-full border-2 shadow-[0_0_14px_rgba(0,0,0,0.7)] transition duration-300 group-hover:scale-135 group-hover:border-white group-hover:bg-white group-focus-visible:scale-135 ${
                    playing ? "border-secondary bg-secondary scale-150" : "border-white bg-black/25"
                }`}
                aria-hidden="true"
            />
            {/* Label is hover-only, so it never shows on touch where the card does the work. */}
            <span
                className="pointer-events-none absolute bottom-[calc(100%+2px)] left-1/2 hidden -translate-x-1/2 bg-white px-2.5 py-[5px] text-[10px] font-bold tracking-[.2rem] whitespace-nowrap text-black uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:block"
                aria-hidden="true"
            >
                {spot.label}
            </span>
        </button>
    );
}

Hotspot.propTypes = {
    spot: PropTypes.object.isRequired,
    playing: PropTypes.bool.isRequired,
    picking: PropTypes.bool,
    onPlay: PropTypes.func.isRequired,
    onGrab: PropTypes.func,
};

export default function HorrorSoundBox() {
    const [active, setActive] = useState(null);
    const [playing, setPlaying] = useState(null);
    const [touched, setTouched] = useState(false);
    const glowTimer = useRef(null);

    // Add ?pick to the URL to drag the rings around and read the coordinates
    // back out. Nothing is persisted: copy the array it prints into HOTSPOTS
    // above. Hidden unless you know the parameter, so it is safe in production.
    const picking = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("pick");
    const [spots, setSpots] = useState(HOTSPOTS);
    const [copied, setCopied] = useState(false);
    const frameRef = useRef(null);
    const dragId = useRef(null);
    const moved = useRef(false);

    const grab = (id) => (e) => {
        if (!picking) return;
        dragId.current = id;
        moved.current = false;
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const dragMove = (e) => {
        if (!dragId.current || !frameRef.current) return;
        const r = frameRef.current.getBoundingClientRect();
        const x = Math.min(Math.max(((e.clientX - r.left) / r.width) * 100, 0), 100);
        const y = Math.min(Math.max(((e.clientY - r.top) / r.height) * 100, 0), 100);
        moved.current = true;
        setSpots((prev) => prev.map((s) => (s.id === dragId.current ? { ...s, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } : s)));
    };

    const drop = () => {
        dragId.current = null;
    };

    // Clicking bare photo in pick mode drops a new ring there. New ids have no
    // entry in SYNTH yet, so they stay silent until one is added.
    const addSpot = (e) => {
        if (!picking || e.target.closest("button") || moved.current || !frameRef.current) return;
        const r = frameRef.current.getBoundingClientRect();
        const x = Math.round(((e.clientX - r.left) / r.width) * 1000) / 10;
        const y = Math.round(((e.clientY - r.top) / r.height) * 1000) / 10;
        setSpots((prev) => {
            let n = prev.length + 1;
            while (prev.some((s) => s.id === `spot${n}`)) n++;
            return [...prev, { id: `spot${n}`, x, y, label: `New spot ${n}`, title: `New spot ${n}`, text: "Describe this part." }];
        });
    };

    const removeSpot = (id) => setSpots((prev) => prev.filter((s) => s.id !== id));

    const rename = (id, label) => setSpots((prev) => prev.map((s) => (s.id === id ? { ...s, label, title: label } : s)));

    const snippet = spots.map((s) => `    { id: "${s.id}", x: ${s.x}, y: ${s.y}, label: "${s.label}", title: "${s.title}", text: "${s.text}" },`).join("\n");

    useEffect(() => () => clearTimeout(glowTimer.current), []);

    useEffect(() => {
        // One video at a time. Media events do not bubble, so this listens on
        // the capture phase to catch play from any player on the page.
        const onPlay = (e) => {
            document.querySelectorAll("video").forEach((v) => {
                if (v !== e.target) v.pause();
            });
        };
        document.addEventListener("play", onPlay, true);
        return () => document.removeEventListener("play", onPlay, true);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") silence();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    // Panic button. Kills anything sounding and resets the ring state with it.
    const silence = () => {
        stopAll();
        clearTimeout(glowTimer.current);
        setPlaying(null);
        setActive(null);
    };

    const play = (spot) => {
        // A drag that ends on the ring should not also fire the sound.
        if (moved.current) {
            moved.current = false;
            return;
        }
        setActive(spot);
        setPlaying(spot.id);
        setTouched(true);
        playSound(spot.id).then((dur) => {
            clearTimeout(glowTimer.current);
            glowTimer.current = setTimeout(() => setPlaying(null), Math.max(300, (dur || 0.4) * 1000));
        });
    };

    return (
        <main className="m-auto w-11/12 pt-28 pb-10 select-none md:pt-40 xl:w-[85%]">
            {/* Side by side from lg up: stacked, the title alone pushes the photo
                past the fold on a maximized window while the right half sits empty.
                On lg the caption overlays the empty top-left of the photo, which
                holds no rings. */}
            <div className="lg:grid lg:grid-cols-[1fr_1.45fr] lg:items-center lg:gap-12 xl:gap-16">
                <header className="max-w-[68ch]">
                    <p className={eyebrow}>Safe &amp; Sound Post &middot; Signature Instrument</p>
                    {/* Capped so "The Horror" stays on one line inside the two-column
                    hero, where the title only gets half the width. */}
                    <h1 className={`${heading} mt-3.5 text-[clamp(2.6rem,4.5vw,5rem)]`}>
                        The Horror
                        <br />
                        Box
                    </h1>
                    <p className="text-secondary mt-5 max-w-[54ch] text-[15px] tracking-[0.08em]">
                        An acoustic instrument built by hand, so that dread can be brought to life by hand.
                    </p>
                </header>

                {/* The photo is 4:3, so height is 0.75 of width. Capping the width in vh
                keeps the whole instrument on screen at once on large displays,
                while narrow screens stay width-constrained as usual. */}
                <div className="mx-auto mt-10 w-full max-w-[108vh] lg:mt-0">
                    {/* The rings are positioned as a % of this figure, so it must wrap the
                    image alone. */}
                    <figure className="relative m-0" onClick={(e) => !e.target.closest("button") && setActive(null)}>
                        <div
                            ref={frameRef}
                            className={`relative block leading-[0] ${picking ? "cursor-crosshair" : ""}`}
                            onPointerMove={dragMove}
                            onPointerUp={drop}
                            onPointerCancel={drop}
                            onClick={addSpot}
                        >
                            <img
                                src={boxPhoto}
                                draggable="false"
                                className="block h-auto w-full"
                                alt="The Horror Box: a mahogany case fitted with brass rods, bowed coils, sprung steel, a string chamber and bamboo tongs."
                            />
                            {/* Vignette pulls the eye to the instrument and away from the studio wall. */}
                            <div
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(76%_76%_at_62%_55%,transparent_40%,rgba(0,0,0,0.6)_100%),linear-gradient(to_bottom,rgba(0,0,0,0.28),transparent_24%)]"
                                aria-hidden="true"
                            />
                            {spots.map((spot) => (
                                <Hotspot
                                    key={spot.id}
                                    spot={spot}
                                    playing={playing === spot.id}
                                    picking={picking}
                                    onGrab={grab(spot.id)}
                                    onPlay={() => play(spot)}
                                />
                            ))}
                        </div>

                        {/* Overlays the photo's empty top-left corner, which no ring
                            occupies (every hotspot sits at x >= 46% or low-left).
                            Click-through so pick mode and dismiss-on-click still work.
                            On phones it drops below the photo and expands in flow. */}
                        <div
                            role="status"
                            aria-live="polite"
                            className={`pointer-events-none overflow-hidden bg-[#f3f3f4] px-5 text-black transition-all duration-300 lg:absolute lg:top-5 lg:left-5 lg:z-40 lg:mt-0 lg:max-h-none lg:w-[min(320px,40%)] lg:py-[18px] ${
                                active ? "mt-4 max-h-60 py-[18px] opacity-100 lg:translate-y-0" : "mt-0 max-h-0 py-0 opacity-0 lg:translate-y-2"
                            }`}
                        >
                            <h2 className={`${heading} text-[22px]`}>{active?.title}</h2>
                            <p className="mt-2 text-[13px] leading-snug tracking-[0.06em]">{active?.text}</p>
                        </div>
                    </figure>

                    {picking && (
                        <div className="mt-4 border-2 border-dashed border-white/40 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-accent text-[11px] font-bold tracking-[.2rem] uppercase">
                                    Pick mode &middot; drag to move &middot; click the photo to add
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard?.writeText(snippet);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 1500);
                                    }}
                                    className="cursor-pointer rounded-full bg-[#f3f3f4] px-4 py-1 text-[11px] font-bold tracking-[.2rem] text-black uppercase hover:bg-white"
                                >
                                    {copied ? "copied" : "copy"}
                                </button>
                            </div>
                            <ul className="mt-3 flex flex-col gap-1.5">
                                {spots.map((spot) => (
                                    <li key={spot.id} className="flex items-center gap-2 text-[11px]">
                                        <input
                                            value={spot.label}
                                            onChange={(e) => rename(spot.id, e.target.value)}
                                            aria-label={`Name for ${spot.id}`}
                                            className="w-44 border border-white/25 bg-black px-2 py-1 text-white focus:border-white focus:outline-none"
                                        />
                                        <span className="w-28 text-white/50 tabular-nums">
                                            {spot.x} , {spot.y}
                                        </span>
                                        <span className="w-20 truncate text-white/30">{spot.id}</span>
                                        {!hasSound(spot.id) && <span className="text-warning font-bold tracking-wider uppercase">no sound yet</span>}
                                        <button
                                            type="button"
                                            onClick={() => removeSpot(spot.id)}
                                            aria-label={`Remove ${spot.label}`}
                                            className="ml-auto cursor-pointer border border-white/25 px-2 py-1 font-bold text-white/70 hover:border-white hover:text-white"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <pre className="mt-3 max-h-52 overflow-auto text-[11px] leading-relaxed whitespace-pre text-white/70 select-text">{snippet}</pre>
                        </div>
                    )}

                    <p className="mt-3.5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-bold tracking-[.2rem] uppercase">
                        <span className="text-secondary">{touched ? "try another" : "tap a ring to play it"}</span>
                        <span className="flex items-center gap-4">
                            {/* Panic button: several takes over twelve rings stack up fast. */}
                            <button
                                type="button"
                                onClick={silence}
                                className="cursor-pointer border border-white/40 px-3 py-1.5 tracking-[.2rem] text-white transition-colors hover:bg-white hover:text-black"
                            >
                                stop all sound
                            </button>
                            <span className="text-secondary max-sm:hidden">recorded from the instrument</span>
                        </span>
                    </p>
                </div>
            </div>

            {/* Text, video, photos read left to right on wide screens. Three columns
                only from xl up: below that the photo column gets too narrow to be
                worth anything, so the photos drop full width under the other two. */}
            <section className="mt-20 lg:grid lg:grid-cols-[minmax(0,58ch)_auto] lg:items-start lg:justify-between lg:gap-12 xl:grid-cols-[1fr_auto_1.35fr] xl:justify-start xl:gap-8">
                <div className="max-w-[68ch]">
                    <p className={eyebrow}>What it is</p>
                    <h2 className={`${heading} mt-3.5 mb-6 text-[clamp(1.9rem,5vw,3.5rem)]`}>Built, not licensed</h2>
                    <p className="mb-5 tracking-[0.04em]">
                        The Horror Box is a physical instrument, built in-house. Brass rods, sprung steel, bowed coils, bamboo tongs and a reverb tank, mounted
                        to one mahogany body and played by hand with bows, mallets and fingers. A packing crate, a garage, and a lot of trial and error.
                    </p>
                    <p className="mb-5 tracking-[0.04em]">
                        Everything it makes is captured by three piezo contact mics wired in series, and the reverb tank carries its own separate output.
                    </p>
                    <p className="mb-5 tracking-[0.04em]">
                        It exists because sample libraries have a ceiling. When every horror cue is assembled from the same commercial packs, every horror film
                        starts to sound like the last one. Building the source instead of buying it means a scene gets tension that has never been under another
                        picture.
                    </p>
                    <p className="mb-8 tracking-[0.04em]">
                        It was built in the spirit of Mark Korven&apos;s Apprehension Engine, made for <em>The Witch</em>. Ours is a separate instrument of our
                        own design and construction. We play it to create{" "}
                        <strong className="text-secondary font-bold">unique, acoustically-sourced tension scoring and sound design</strong>: recorded dry in the
                        studio, then processed, layered and tuned to picture until it reads as score, as atmosphere, or as something an audience cannot quite
                        place and does not want to hear again.
                    </p>
                </div>

                <DemoVideo />

                {/* Third column at 2xl, where 3x3 lands close to the video's height.
                    Below that it spans the row underneath text and video instead. */}
                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:col-span-2 lg:mt-12 lg:gap-4 xl:col-span-1 xl:mt-0 xl:gap-3">
                    {buildPhotos.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            draggable="false"
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover"
                            alt={`Building the Horror Box, step ${i + 1} of ${buildPhotos.length}`}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-20 bg-[#f3f3f4] p-8 text-black md:p-10">
                <p className="text-xs font-bold tracking-[.2rem] uppercase">Raw to finished</p>
                <h2 className={`${heading} mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)]`}>From the box to the mix</h2>
                <p className="mt-1.5 mb-7 text-sm tracking-[0.06em]">
                    The same cut twice. Switch between them while it plays and the picture stays where it is.
                </p>
                <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                    {SCENES.map((scene) => (
                        <ScenePlayer key={scene.title} scene={scene} />
                    ))}
                </div>
            </section>

        </main>
    );
}
