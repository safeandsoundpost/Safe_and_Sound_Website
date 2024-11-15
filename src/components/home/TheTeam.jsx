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

        // console.log(teamData);
    }, []);

    return (
        <section
            id="the-team"
            className="flex max-h-[75%] w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-0 text-center text-4xl font-bold uppercase tracking-widest text-secondary md:py-10">
                who we are
            </h2>

            <dialog ref={modal} className="modal">
                <TeamModal currentTeam={currentTeam} />
            </dialog>

            <div className="flex flex-col-reverse gap-5 md:flex-row">
                <div className="flex flex-row gap-3 md:flex-col md:gap-5">
                    {teamData
                        .sort((a, b) => a.order - b.order)
                        .map((val, index) => (
                            <img
                                draggable="false"
                                src={val.pic}
                                key={index}
                                className="aspect-square w-1/6 select-none hover:cursor-pointer hover:invert md:ml-auto md:w-[45%] lg:w-[40%] xl:w-[58%] 2xl:w-[80%]"
                                onClick={() => {
                                    modal.current.showModal();
                                    setCurrentTeam(val);
                                }}
                            />
                        ))}
                </div>
                <div className="w-full md:grow">
                    <img
                        className="pointer-events-none select-none"
                        draggable="false"
                        src={text}
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
            <div className="modal-box max-w-full select-none bg-[#1a1a1a] max-md:p-3 md:max-w-6xl">
                <div className="relative gap-3 md:gap-0">
                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost absolute right-2 top-2">
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
                <button>close</button>
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
