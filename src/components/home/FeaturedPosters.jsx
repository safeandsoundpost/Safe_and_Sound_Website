import { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { resolveImages } from "../ProjectsCarousel";
import { ProjectModal } from "./Projects";

const featured_titles = ["Cows Come Home", "Alice is Asian", "You Are Here", "Burdened"];

// Posters that play a muted trailer (Cloudflare Stream ID) inside their bounds on hover.
const hover_videos = {
    "Cows Come Home": "d7b88e9554b01845c14a969e20a3198a",
    "Alice is Asian": "abffa9b0c39fa0029d7c692a2c3e5bae",
    "You Are Here": "e297a32bdcf0893ad01077a85a1664c3",
    Burdened: "f25110454cd2cd70733b29474bb05429",
};

// Posters that show a watch banner on hover. Links default to the project's
// ytsrc from the projects data; label/href can be overridden per title.
const watch_banners = {
    "Cows Come Home": { label: "watch on bell tv1", href: "https://tv1.bell.ca/fibetv1/shows/cows-come-home" },
    "Alice is Asian": {},
    "You Are Here": {},
};

// clientBandwidthHint pins the manifest to the top rendition so the preview
// starts sharp instead of ramping up from a blurry one.
const trailerSrc = (videoId) => `https://customer-542wgslfba2pjmw7.cloudflarestream.com/${videoId}/manifest/video.m3u8?clientBandwidthHint=5`;

function FeaturedPoster({ project, onOpen }) {
    const videoId = hover_videos[project.title];
    const banner = watch_banners[project.title];
    const watchLink = banner ? (banner.href ?? project.ytsrc) : null;
    // On touch screens there's no hover, so the first tap starts the preview
    // and only the next tap opens the info modal.
    const tapPreviewStarted = useRef(false);

    const handleClick = () => {
        const canHover = window.matchMedia("(hover: hover)").matches;
        if (videoId && !canHover && !tapPreviewStarted.current) {
            tapPreviewStarted.current = true;
            setHovered(true);
            pokeControls();
            return;
        }
        onOpen();
    };
    const [hovered, setHovered] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    // the sound toggle auto-hides like player controls: shown on activity,
    // gone after a couple of seconds of stillness
    const [controlsVisible, setControlsVisible] = useState(false);
    const hideTimer = useRef(null);
    const videoRef = useRef(null);

    const pokeControls = () => {
        setControlsVisible(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setControlsVisible(false), 2000);
    };

    useEffect(() => {
        if (playing) pokeControls();
    }, [playing]);

    useEffect(() => () => clearTimeout(hideTimer.current), []);

    const toggleSound = (e) => {
        // don't let the speaker click bubble up and open the project modal
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
    };

    useEffect(() => {
        if (!hovered) return;
        const video = videoRef.current;
        if (!video) return;

        const onPlaying = () => setPlaying(true);
        video.addEventListener("playing", onPlaying);

        let hls;
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(trailerSrc(videoId));
            hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = trailerSrc(videoId);
        }

        // Start with sound on; browsers refuse un-gestured audio until the
        // visitor has clicked somewhere, so fall back to muted playback.
        video.muted = false;
        video
            .play()
            .then(() => setMuted(false))
            .catch(() => {
                video.muted = true;
                setMuted(true);
                video.play().catch(() => {});
            });

        return () => {
            video.removeEventListener("playing", onPlaying);
            hls?.destroy();
            setPlaying(false);
            // next hover must start muted, or the browser blocks the autoplay
            setMuted(true);
        };
    }, [hovered, videoId]);

    return (
        <div
            className="group relative aspect-[2/3] w-full cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
            onMouseEnter={
                videoId || watchLink
                    ? () => {
                          setHovered(true);
                          pokeControls();
                      }
                    : undefined
            }
            onMouseLeave={
                videoId || watchLink
                    ? () => {
                          setHovered(false);
                          clearTimeout(hideTimer.current);
                          setControlsVisible(false);
                          tapPreviewStarted.current = false;
                      }
                    : undefined
            }
            onMouseMove={videoId || watchLink ? pokeControls : undefined}
            onClick={handleClick}
        >
            <img
                className={`h-full w-full object-cover transition-opacity duration-300 select-none ${videoId && playing ? "opacity-0" : "opacity-100"}`}
                draggable="false"
                src={project.posterSrc}
                alt={`${project.title} poster`}
            />
            {videoId && hovered && (
                <>
                    <video
                        ref={videoRef}
                        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                            playing ? "opacity-100" : "opacity-0"
                        }`}
                        loop
                        playsInline
                        disablePictureInPicture
                        aria-hidden="true"
                    ></video>
                    <button
                        type="button"
                        className={`absolute right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-opacity duration-300 hover:bg-black/85 ${
                            watchLink ? "bottom-12" : "bottom-2"
                        } ${playing && controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        onClick={toggleSound}
                        aria-label={muted ? "Turn sound on" : "Turn sound off"}
                    >
                        {muted ? <IoVolumeMute className="size-5" /> : <IoVolumeHigh className="size-5" />}
                    </button>
                </>
            )}
            {watchLink && (
                <a
                    href={watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute bottom-0 left-0 z-10 w-full bg-black/55 py-2.5 text-center text-xs font-bold tracking-[0.25em] text-white uppercase backdrop-blur-sm transition-opacity duration-300 hover:bg-black/80 ${
                        controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {banner.label ?? "watch film"}
                </a>
            )}
        </div>
    );
}

FeaturedPoster.propTypes = {
    project: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default function FeaturedPosters() {
    const modal = createRef(null);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const resolved = resolveImages();
        setProjects(featured_titles.map((title) => resolved.find((x) => x.title === title)).filter(Boolean));
    }, []);

    const openModal = (project) => {
        setCurrentProject({ project, image: { posterSrc: project.posterSrc, poster: project.posterSrc } });
        modal.current.showModal();
    };

    return (
        <section id="featured" className="m-auto w-11/12 py-16 md:py-24 lg:w-11/12 xl:w-4/5">
            <dialog ref={modal} className="modal">
                <ProjectModal currentProject={currentProject} />
            </dialog>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {projects.map((project) => (
                    <FeaturedPoster key={project.title} project={project} onOpen={() => openModal(project)} />
                ))}
            </div>
        </section>
    );
}
