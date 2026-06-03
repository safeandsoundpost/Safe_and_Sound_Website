import { createRef, useState } from "react";
import PropTypes from "prop-types";
import { ProjectsCarousel, ProjectsCollage } from "../ProjectsCarousel";
import { IoClose, IoPlayCircleOutline, IoGlobeOutline } from "react-icons/io5";
import { RiStarFill } from "react-icons/ri";

export default function Projects() {
    const modal = createRef(null);
    const [direction, setDirection] = useState(null);
    const [isCollage, setIsCollage] = useState(false);

    /**
     * @type {[{ project: object, image: object } | null, React.Dispatch<React.SetStateAction<{ project: object, image: object }>>]}
     */
    const [currentProject, setCurrentProject] = useState(null);

    const openModal = (currentProject) => {
        setCurrentProject(currentProject);
        modal.current.showModal();
    };

    const onModalChangeRequest = (direction) => {
        switch (direction) {
            case "ArrowRight":
                setDirection("right");
                console.log("right");
                return;
            case "ArrowLeft":
                setDirection("left");
                console.log("left");
                return;
            default:
                return;
        }
    };

    return (
        <section id="projects" className="relative w-full">
            <button
                className="flex w-full cursor-pointer items-center justify-center gap-3 py-10 group"
                onClick={() => setIsCollage((v) => !v)}
                aria-label="Toggle project view"
            >
                <h2 className="text-secondary text-center text-4xl font-bold tracking-widest uppercase">Projects</h2>
                <RiStarFill
                    className={`stroke-2 size-7 transition-all duration-300 ${isCollage ? "fill-secondary stroke-secondary rotate-12" : "fill-transparent stroke-white group-hover:fill-secondary group-hover:stroke-secondary group-hover:rotate-12"}`}
                />
            </button>
            <dialog ref={modal} className="modal" onKeyDown={(e) => onModalChangeRequest(e.key)}>
                <ProjectModal currentProject={currentProject} />
            </dialog>
            {isCollage
                ? <ProjectsCollage onClick={openModal} />
                : <ProjectsCarousel onClick={openModal} />
            }
        </section>
    );
}

/**
 * @param {object} params
 * @param {{ project: object, image: object }} params.currentProject
 * @returns
 */
function ProjectModal({ currentProject }) {
    if (!currentProject) return <></>;

    const { project, image } = currentProject;

    if (!project) return <></>;

    return (
        <>
            <div className="modal-box max-w-full bg-[#1a1a1a] max-md:p-3 md:max-w-6xl">
                <form method="dialog">
                    <button name="Close project" className="btn btn-circle btn-ghost btn-sm md:btn-md absolute top-2 right-2">
                        <IoClose className="size-3/4 md:size-3/4" strokeWidth={20} />
                    </button>
                </form>
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                    <img className="aspect-auto rounded-3xl" src={image.posterSrc} alt={image.poster} />
                    <div className="flex flex-col items-center justify-center gap-2 align-middle md:gap-12">
                        <h3 className="text-primary text-xl font-bold tracking-widest uppercase md:text-4xl">{project.title}</h3>
                        <div className="flex w-full flex-col gap-5 text-xs font-semibold md:w-2/3 md:text-2xl">
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Released:</p>
                                <p className="w-1/2 text-left">{project.released}</p>
                            </div>
                            {project.director && (
                                <div className="flex w-full justify-between">
                                    <p className="w-1/2">{project.director.includes(",") ? "Directors:" : "Director:"}</p>
                                    <p className="w-1/2 text-left">{project.director}</p>
                                </div>
                            )}
                            {project.producer && (
                                <div className="flex w-full justify-between">
                                    <p className="w-1/2 shrink-0">{project.producer.includes(",") ? "Producers:" : "Producer:"}</p>
                                    {project.producer.includes(",") ? (
                                        <ul className="w-1/2 max-h-40 overflow-y-auto text-left space-y-1">
                                            {project.producer.split(",").map((p, i) => {
                                                const match = p.trim().match(/^(.*?)\s*\(([^)]+)\)$/);
                                                return match ? (
                                                    <li key={i}>
                                                        <span>{match[1]}</span>
                                                        <span className="block text-[0.6em] font-normal text-gray-400">{match[2]}</span>
                                                    </li>
                                                ) : (
                                                    <li key={i}>{p.trim()}</li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="w-1/2 text-left">{project.producer}</p>
                                    )}
                                </div>
                            )}
                            {(project.imdb || project.ytsrc || project.website || project.trailer) && (
                                <div className="mt-5 flex flex-col gap-5">
                                    {project.imdb && (
                                        <a
                                            href={project.imdb}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-secondary cursor-pointer text-center"
                                        >
                                            IMDB
                                        </a>
                                    )}
                                    {project.ytsrc && (
                                        <a
                                            href={project.ytsrc}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-secondary flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <IoPlayCircleOutline className="size-6 md:size-8" />
                                            <span className="text-sm tracking-widest uppercase md:text-base">Watch Now</span>
                                        </a>
                                    )}
                                    {project.trailer && (
                                        <a
                                            href={project.trailer}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-secondary flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <IoPlayCircleOutline className="size-6 md:size-8" />
                                            <span className="text-sm tracking-widest uppercase md:text-base">Watch Trailer</span>
                                        </a>
                                    )}
                                    {project.website && (
                                        <a
                                            href={project.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-secondary flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <IoGlobeOutline className="size-6 md:size-8" />
                                            <span className="text-sm tracking-widest uppercase md:text-base">Visit Website</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button name="Close project">close</button>
            </form>
        </>
    );
}

ProjectModal.propTypes = {
    currentProject: PropTypes.shape({
        project: PropTypes.shape({
            title: PropTypes.string.isRequired,
            released: PropTypes.string.isRequired,
            director: PropTypes.string,
            // directors: PropTypes.arrayOf(PropTypes.string),
            producer: PropTypes.string,
            // producers: PropTypes.arrayOf(PropTypes.string),
            imdb: PropTypes.string,
            ytsrc: PropTypes.string,
        }),
        image: PropTypes.object,
    }),
};
