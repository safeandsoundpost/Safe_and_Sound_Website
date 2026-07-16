/* eslint-disable react/prop-types */
import { createRef, useEffect, useState } from "react";
import teamData from "./teamdata";
import PropTypes from "prop-types";
import { HiExternalLink } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function TheTeam() {
    const modal = createRef(null);
    const [currentTeam, setCurrentTeam] = useState(null);

    const [topRow, setTopRow] = useState([]);
    const [bottomRow, setBottomRow] = useState([]);

    useEffect(() => {
        const img_paths = Object.values(
            import.meta.glob("@team/*.webp", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);
        teamData.forEach((project) => {
            const img = img_paths.find((x) => x.includes(project.pic));
            project.pic = img;
        });
        setTopRow(teamData.filter((x) => x.mobileRow === 1).sort((a, b) => a.mobileColumn - b.mobileColumn));
        setBottomRow(teamData.filter((x) => x.mobileRow === 2).sort((a, b) => a.mobileColumn - b.mobileColumn));
    }, []);

    const onHeadshotClick = (_val) => {
        modal.current.showModal();
        setCurrentTeam(_val);
    };

    return (
        <section id="the-team" className="flex w-full flex-col items-center justify-center gap-10 px-5 align-middle md:px-16 xl:px-5">
            <dialog ref={modal} className="modal">
                <TeamModal currentTeam={currentTeam} />
            </dialog>

            <div className="flex h-fit w-full flex-col justify-center gap-3 md:gap-5">
                {/* equal columns up front — auto-flow columns size to the first
                    image that loads, flashing it full-width on slow networks */}
                <div className="grid w-auto grow gap-3 md:gap-5" style={{ gridTemplateColumns: `repeat(${topRow.length || 1}, minmax(0, 1fr))` }}>
                    {topRow.map((val, index) => (
                        <TeamHeadshot key={index} pic={val.pic} onClick={() => onHeadshotClick(val)} alt={val.name} />
                    ))}
                </div>
                <div className="grid w-auto grow gap-3 md:gap-5" style={{ gridTemplateColumns: `repeat(${bottomRow.length || 1}, minmax(0, 1fr))` }}>
                    {bottomRow.map((val, index) => (
                        <TeamHeadshot key={index} pic={val.pic} onClick={() => onHeadshotClick(val)} alt={val.name} />
                    ))}
                </div>
                <div className="mt-5 h-fit w-full">
                    <MissionStatement />
                </div>
            </div>
        </section>
    );
}

function MissionStatement() {
    return (
        <div className="text-primary space-y-6 text-center text-sm font-normal tracking-[0.2em] md:text-base xl:text-lg">
            <p>
                Supporting diverse and emerging filmmakers is the driving force here at Safe &amp; Sound. As passionate artists ourselves, we
                know the obsession that goes into crafting that perfect story, and how important it is to feel{" "}
                <span className="text-accent">safe and empowered in your decisions</span>. Our small team brings the experience and technical
                ability of a large post-audio studio with the fun, personalized atmosphere of people truly invested in seeing your art succeed,
                in a space <span className="text-accent">free of hate and discrimination</span>.
            </p>
            <p>
                With us, you are always <span className="text-accent">Safe &amp; Sound</span>.
            </p>
        </div>
    );
}

function TeamHeadshot({ pic, onClick, alt }) {
    return (
        <img
            className="aspect-[500/543] w-full grayscale transition-all select-none hover:cursor-pointer hover:grayscale-0"
            onClick={onClick}
            draggable="false"
            src={pic}
            alt={alt}
        />
    );
}

/**
 * @param {object} params
 * @param {{ name: string, role: string, pic: string, bio: string, favFilm: string }} params.currentTeam
 * @returns
 */
function TeamModal({ currentTeam }) {
    const [showActualFav, setShowActualFav] = useState(false);

    useEffect(() => {
        setShowActualFav(false);
    }, [currentTeam]);

    if (!currentTeam) return <></>;

    const { bio, favFilm, name, pic, role } = currentTeam;

    const onFilmDoubleClick = () => {
        if (currentTeam.actualFavFilm) setShowActualFav(!showActualFav);
        if (currentTeam.filmLink) open(currentTeam.filmLink);
    };

    return (
        <>
            <div className="modal-box max-w-full bg-[#1a1a1a] select-none max-md:p-3 lg:max-w-6xl">
                <div className="gap-3 px-3 py-3 md:gap-0 md:px-0 md:py-0">
                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm md:btn-md absolute top-2 right-2" name="Close team card">
                            <IoClose className="size-3/4 md:size-3/4" strokeWidth={20} />
                        </button>
                    </form>
                    <div className="flex flex-col items-center justify-center gap-2 align-middle md:gap-3">
                        <div className="w-full md:w-4/5">
                            <h3 className="text-primary text-xl font-bold tracking-widest uppercase md:text-4xl">{name}</h3>
                            <p className="text-secondary text-sm font-semibold tracking-widest uppercase md:text-xl">{role}</p>
                        </div>
                        <div className="flex w-full flex-col gap-5 text-xs font-semibold md:w-4/5 md:text-2xl">
                            <div className="flex w-full justify-between gap-3">
                                <p className="h-fit w-fit">Bio:</p>
                                <p className="h-fit w-full text-left whitespace-pre-line md:text-lg">
                                    <img
                                        className="float-right mb-1 ml-4 aspect-[500/543] h-4/12 w-6/12 rounded-3xl md:mb-4 md:ml-8 md:h-fit"
                                        src={pic}
                                        alt={currentTeam.name}
                                    />
                                    {bio}
                                </p>
                            </div>
                            <div className="flex w-full justify-between gap-4">
                                <p className="w-fit text-nowrap">Favorite film:</p>
                                <div className="flex w-full grow justify-between">
                                    <span
                                        className={`text-secondary w-fit text-left ${currentTeam.filmLabel ? "tooltip tooltip-top" : ""}`}
                                        data-tip={currentTeam.filmLabel}
                                        onDoubleClick={onFilmDoubleClick}
                                    >
                                        {!showActualFav && <p>{favFilm}</p>}
                                        {showActualFav && (
                                            <div className="inline-flex w-full">
                                                <p>{currentTeam.actualFavFilm}</p>
                                                <img
                                                    className="float-start mx-5 aspect-square h-10 animate-bounce"
                                                    src="https://seeklogo.com/images/P/paw-patrol-logo-A0229DE2A9-seeklogo.com.png"
                                                    alt="actual favorite movie"
                                                ></img>
                                            </div>
                                        )}
                                    </span>
                                    {currentTeam.imdb && (
                                        <a className="link flex items-center justify-center gap-2" href={currentTeam.imdb} target="_blank">
                                            IMDB
                                            <HiExternalLink />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button name="Close team card">close</button>
            </form>
        </>
    );
}

TeamModal.propTypes = {
    currentTeam: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string,
        pic: PropTypes.string,
        bio: PropTypes.string,
        favFilm: PropTypes.string,
    }),
};
