import { createRef, useState } from "react";
import PropTypes from "prop-types";
import { ProjectsCollage } from "../ProjectsCarousel";
import { IoClose, IoPlayCircleOutline, IoGlobeOutline } from "react-icons/io5";

export default function Projects() {
    const modal = createRef(null);

    /**
     * @type {[{ project: object, image: object } | null, React.Dispatch<React.SetStateAction<{ project: object, image: object }>>]}
     */
    const [currentProject, setCurrentProject] = useState(null);

    const openModal = (currentProject) => {
        setCurrentProject(currentProject);
        modal.current.showModal();
    };

    return (
        <section id="projects" className="relative w-full">
            <dialog ref={modal} className="modal">
                <ProjectModal currentProject={currentProject} />
            </dialog>
            <ProjectsCollage onClick={openModal} />
        </section>
    );
}

/**
 * @param {object} params
 * @param {{ project: object, image: object }} params.currentProject
 * @returns
 */
export function ProjectModal({ currentProject }) {
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
                        <div className="flex w-full flex-col gap-5 text-xs font-semibold md:w-5/6 md:text-xl">
                            <div className="flex w-full justify-between gap-3">
                                <p className="w-2/5 shrink-0">Released:</p>
                                <p className="w-3/5 text-left">{project.released}</p>
                            </div>
                            {project.writer && (
                                <div className="flex w-full justify-between gap-3">
                                    <p className="w-2/5 shrink-0">{project.writer.includes(",") ? "Writers/Creators:" : "Writer/Creator:"}</p>
                                    {project.writer.includes(",") ? (
                                        <ul className="w-3/5 space-y-1 text-left">
                                            {project.writer.split(",").map((name, i) => (
                                                <li key={i} className="whitespace-nowrap">{name.trim()}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="w-3/5 text-left whitespace-nowrap">{project.writer}</p>
                                    )}
                                </div>
                            )}
                            {project.director && (
                                <div className="flex w-full justify-between gap-3">
                                    <p className="w-2/5 shrink-0">{project.director.includes(",") ? "Directors:" : "Director:"}</p>
                                    {project.director.includes(",") ? (
                                        <ul className="w-3/5 space-y-1 text-left">
                                            {project.director.split(",").map((name, i) => (
                                                <li key={i} className="whitespace-nowrap">{name.trim()}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="w-3/5 text-left whitespace-nowrap">{project.director}</p>
                                    )}
                                </div>
                            )}
                            {project.producer && (
                                <div className="flex w-full justify-between gap-3">
                                    <p className="w-2/5 shrink-0">{project.producer.includes(",") ? "Producers:" : "Producer:"}</p>
                                    {project.producer.includes(",") ? (
                                        <ul className="w-3/5 max-h-40 overflow-y-auto text-left space-y-1">
                                            {project.producer.split(",").map((p, i) => {
                                                const match = p.trim().match(/^(.*?)\s*\(([^)]+)\)$/);
                                                return match ? (
                                                    <li key={i}>
                                                        <span className="whitespace-nowrap">{match[1]}</span>
                                                        <span className="block text-[0.6em] font-normal text-gray-400">{match[2]}</span>
                                                    </li>
                                                ) : (
                                                    <li key={i} className="whitespace-nowrap">{p.trim()}</li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="w-3/5 text-left whitespace-nowrap">{project.producer}</p>
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
            writer: PropTypes.string,
            director: PropTypes.string,
            producer: PropTypes.string,
            // producers: PropTypes.arrayOf(PropTypes.string),
            imdb: PropTypes.string,
            ytsrc: PropTypes.string,
            trailer: PropTypes.string,
            website: PropTypes.string,
        }),
        image: PropTypes.object,
    }),
};
