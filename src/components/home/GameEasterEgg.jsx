import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import gamePoster from "../../assets/images/game-poster.png";

// The RPG is a static build copied into public/game by `npm run sync-game`.
const GAME_SRC = "/game/index.html";

/**
 * Hidden tile at the end of the projects grid. It sits in the empty black
 * cell after the last poster: with a mouse it fades in on hover, on touch
 * the first tap reveals it and the second one starts the game.
 */
export function GameTile() {
    const [revealed, setRevealed] = useState(false);
    const [playing, setPlaying] = useState(false);

    const onClick = () => {
        const touch = window.matchMedia("(hover: none)").matches;
        if (touch && !revealed) {
            setRevealed(true);
            return;
        }
        setPlaying(true);
    };

    return (
        <>
            <button
                type="button"
                aria-label="Play Safe & Sound: The Final Mix"
                onClick={onClick}
                className={`group cursor-pointer border-2 p-2 transition-[border-color,opacity] duration-500 ${
                    revealed ? "border-primary opacity-100" : "border-transparent opacity-0 hover:border-primary hover:opacity-100 focus-visible:border-primary focus-visible:opacity-100"
                }`}
            >
                <img
                    draggable="false"
                    className="aspect-[12/16] w-full object-cover transition-transform duration-300 ease-in-out select-none group-hover:scale-105"
                    style={{ imageRendering: "pixelated" }}
                    src={gamePoster}
                    alt="Safe & Sound: The Final Mix, an 8-bit game"
                />
            </button>
            {playing && <GameOverlay onClose={() => setPlaying(false)} />}
        </>
    );
}

function GameOverlay({ onClose }) {
    const frame = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        const raf = requestAnimationFrame(() => setShown(true));
        return () => {
            cancelAnimationFrame(raf);
            document.body.style.overflow = overflow;
        };
    }, []);

    // The game is same-origin, so its page can be made see-through: only the
    // console shell stays solid and the dimmed site shows around it. A press
    // on the game's own background (outside the shell) counts as clicking off.
    const onLoad = () => {
        const win = frame.current?.contentWindow;
        const doc = win?.document;
        if (!doc) return;
        doc.documentElement.style.background = "transparent";
        doc.body.style.background = "transparent";
        doc.addEventListener("pointerdown", (e) => {
            if (e.target === doc.body || e.target === doc.documentElement) onClose();
        });
        // Keyboard controls need focus inside the frame straight away.
        win.focus();
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black/75 transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
            onPointerDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <iframe
                ref={frame}
                src={GAME_SRC}
                title="Safe & Sound: The Final Mix"
                className="absolute inset-0 h-full w-full border-0"
                // Matching the game's dark scheme keeps the frame transparent.
                style={{ colorScheme: "dark" }}
                allow="autoplay; fullscreen"
                onLoad={onLoad}
            />
            <button
                type="button"
                aria-label="Back to site"
                onClick={onClose}
                className="hover:text-secondary absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-10 cursor-pointer transition-colors"
            >
                <IoClose className="size-7" />
            </button>
        </div>
    );
}

GameOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};
