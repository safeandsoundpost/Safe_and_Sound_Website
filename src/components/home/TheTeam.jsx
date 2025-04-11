/* eslint-disable react/prop-types */
import { createRef, useEffect, useState } from "react";
import text from "../../assets/images/team/who-we-are-text.png";
import teamData from "./teamdata";
import PropTypes from "prop-types";
import { HiExternalLink } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function TheTeam() {
    const modal = createRef(null);
    const [currentTeam, setCurrentTeam] = useState(null);

    const [leftColumn, setLeftColumn] = useState([]);
    const [rightColumn, setRightColumn] = useState([]);

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
        setLeftColumn(teamData.filter((x) => x.column === 1).sort((a, b) => a.order - b.order));
        setRightColumn(teamData.filter((x) => x.column === 2).sort((a, b) => a.order - b.order));
    }, []);

    const onHeadshotClick = (_val) => {
        modal.current.showModal();
        setCurrentTeam(_val);
    };

    return (
        <section id="the-team" className="flex w-full flex-col items-center justify-center gap-10 px-5 pt-10 pb-15 align-middle md:px-16 xl:px-5">
            <h2 className="text-secondary w-full py-0 text-center text-4xl font-bold tracking-widest uppercase md:py-10">who we are</h2>

            <dialog ref={modal} className="modal">
                <TeamModal currentTeam={currentTeam} />
            </dialog>

            <div className="flex h-fit w-full flex-col justify-center gap-5 lg:flex-row">
                <div className="grid w-auto grow grid-flow-col gap-3 md:gap-2 lg:max-w-[10%] lg:grid-flow-row lg:gap-2 xl:gap-5">
                    {leftColumn.map((val, index) => (
                        <TeamHeadshot key={index} pic={val.pic} onClick={() => onHeadshotClick(val)} alt={val.name} />
                    ))}
                </div>
                <div className="hidden h-fit w-full lg:block">
                    <img
                        className="pointer-events-none w-full select-none"
                        draggable="false"
                        src={text}
                        alt="Supporting the needs of diverse and emerging filmmakers is the driving force here at Safe & Sound. AS passionate artists ourselves we know the obsession that goes into crafting that perfect story, and how important it is to feel safe and empowered in out decisions. Our small team comes with the work experience and technical ability of a large post-studio studio without sacrificint that fun, personalized atmosphere you can only find with people truly invested in seeing your art succeed. We're forever dedicated to learning and creating a space free of hate discrimination and 'bar ideas'. With us, you are always Safe & Sound."
                    />
                </div>
                <div className="grid w-auto grow grid-flow-col gap-3 md:gap-2 lg:max-w-[10%] lg:grid-flow-row lg:gap-2 xl:gap-5">
                    {rightColumn.map((val, index) => (
                        <TeamHeadshot key={index} pic={val.pic} onClick={() => onHeadshotClick(val)} alt={val.name} />
                    ))}
                </div>
                <div className="h-fit w-full shrink lg:hidden">
                    <img
                        className="pointer-events-none mx-auto select-none"
                        draggable="false"
                        src={text}
                        alt="Supporting the needs of diverse and emerging filmmakers is the driving force here at Safe & Sound. AS passionate artists ourselves we know the obsession that goes into crafting that perfect story, and how important it is to feel safe and empowered in out decisions. Our small team comes with the work experience and technical ability of a large post-studio studio without sacrificint that fun, personalized atmosphere you can only find with people truly invested in seeing your art succeed. We're forever dedicated to learning and creating a space free of hate discrimination and 'bar ideas'. With us, you are always Safe & Sound."
                    />
                </div>
            </div>
        </section>
    );
}

function TeamHeadshot({ pic, onClick, alt }) {
    return (
        <img
            className="aspect-[500/543] w-fit grayscale transition-all select-none hover:cursor-pointer hover:grayscale-0 md:m-0 lg:m-0 lg:mr-0 lg:ml-auto lg:p-0"
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
                            <div className="flex w-full justify-between">
                                <p className="h-fit w-1/4">Bio:</p>
                                <p className="h-fit w-3/4 text-justify whitespace-pre-line md:text-lg">
                                    <img
                                        className="float-right mb-1 ml-4 aspect-[500/543] h-4/12 w-2/5 rounded-3xl md:mb-4 md:ml-8 md:h-fit"
                                        src={pic}
                                        alt={currentTeam.name}
                                    />
                                    {bio}
                                </p>
                            </div>
                            <div className="flex w-full justify-between">
                                <p className="w-1/4">Favorite film:</p>
                                <div className="flex grow justify-between">
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
