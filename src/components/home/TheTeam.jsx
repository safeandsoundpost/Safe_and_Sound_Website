/* eslint-disable react/prop-types */
import { createRef, useEffect, useState } from "react";
import text from "../../assets/images/team/who-we-are-text.png";
import teamData from "./teamdata";
import PropTypes from "prop-types";

export default function TheTeam() {
    const modal = createRef(null);
    const [currentTeam, setCurrentTeam] = useState(null);

    useEffect(() => {
        const img_paths = Object.values(
            import.meta.glob("@team/*.{png,jpg,jpeg,PNG,JPEG}", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);
        teamData.forEach((project) => {
            const img = img_paths.find((x) => x.includes(project.pic));
            project.pic = img;
        });
    }, []);

    return (
        <section
            id="the-team"
            className="flex max-h-[75%] w-full flex-col items-center justify-center gap-10 pt-10 align-middle"
        >
            <h2 className="w-full py-0 text-center text-4xl font-bold uppercase tracking-widest text-secondary md:py-10">
                who we are
            </h2>

            <dialog ref={modal} className="modal">
                <TeamModal currentTeam={currentTeam} />
            </dialog>

            {/* flex flex-col-reverse gap-5 md:w-[80%] md:flex-row md:gap-3 lg:gap-5 lg:w-full */}
            <div className="flex flex-col justify-center gap-5 md:w-[80%] md:gap-3 lg:w-full lg:flex-row lg:gap-5 xl:gap-10">
                {/* <div className="flex w-[14%] flex-row gap-3 lg:flex-col md:gap-2 lg:gap-2 xl:gap-5 md:w-[18%] lg:w-[10%] xl:w-[11.5%] 2xl:w-[9.5%]"> */}
                <div className="grid w-full grid-flow-col gap-3 md:gap-2 lg:h-fit lg:w-[10%] lg:grid-flow-row lg:gap-2 xl:w-[9%] xl:gap-5 2xl:w-[9.5%]">
                    {teamData
                        .sort((a, b) => a.order - b.order)
                        .map((val, index) => (
                            <img
                                draggable="false"
                                src={val.pic}
                                key={index}
                                className="aspect-square w-fit select-none hover:cursor-pointer hover:invert md:m-0 lg:m-0 lg:ml-auto lg:mr-0 lg:p-0"
                                onClick={() => {
                                    modal.current.showModal();
                                    setCurrentTeam(val);
                                }}
                                alt={val.name}
                            />
                        ))}
                </div>
                <div
                    className="h-fit w-fit lg:w-[60%] lg:max-w-[60%] xl:w-[75%] 2xl:w-fit"
                    // style={{ flexBasis: "content" }}
                >
                    <img
                        className="pointer-events-none select-none"
                        draggable="false"
                        src={text}
                        alt="Supporting the needs of diverse and emerging filmmakers is the driving force here at Safe & Sound. AS passionate artists ourselves we know the obsession that goes into crafting that perfect story, and how important it is to feel safe and empowered in out decisions. Our small team comes with the work experience and technical ability of a large post-studio studio without sacrificint that fun, personalized atmosphere you can only find with people truly invested in seeing your art succeed. We're forever dedicated to learning and creating a space free of hate discrimination and 'bar ideas'. With us, you are always Safe & Sound."
                    />
                </div>
            </div>
        </section>
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

    return (
        <>
            <div className="modal-box max-w-full select-none bg-[#1a1a1a] max-md:p-3 lg:max-w-6xl">
                <div className="relative gap-3 md:gap-0">
                    <form method="dialog">
                        <button
                            className="btn btn-circle btn-ghost absolute right-2 top-2"
                            name="Close team card"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="h-3/4 w-3/4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </form>
                    <div className="flex flex-col items-center justify-center gap-2 align-middle md:gap-3">
                        <div className="md:w-4/5">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-primary md:text-4xl">
                                {name}
                            </h3>
                            <p className="text-sm font-semibold uppercase tracking-widest text-secondary md:text-xl">
                                {role}
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-5 text-xs font-semibold md:w-4/5 md:text-2xl">
                            <div className="flex w-full justify-between">
                                <p className="h-fit w-1/4">Bio:</p>
                                <p className="h-fit w-3/4 whitespace-pre-line text-justify md:text-lg">
                                    <img
                                        className="float-right mb-1 ml-4 aspect-square h-1/5 w-1/2 rounded-3xl md:mb-4 md:ml-8 md:h-fit md:w-fit"
                                        src={pic}
                                        alt={currentTeam.name}
                                    />
                                    {bio}
                                </p>
                            </div>
                            <div className="flex w-full justify-between">
                                <p className="w-1/4">Favorite film:</p>
                                <p
                                    className="w-3/4 text-left text-secondary"
                                    onDoubleClick={() => {
                                        if (currentTeam.actualFavFilm) {
                                            setShowActualFav(!showActualFav);
                                        }
                                    }}
                                >
                                    {!showActualFav && favFilm}
                                    {showActualFav && (
                                        <>
                                            {currentTeam.actualFavFilm}
                                            <img
                                                className="float-start mx-5 aspect-square h-10"
                                                src="https://seeklogo.com/images/P/paw-patrol-logo-A0229DE2A9-seeklogo.com.png"
                                                alt="actual favorite movie"
                                            ></img>
                                        </>
                                    )}
                                </p>
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
