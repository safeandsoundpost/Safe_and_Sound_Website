import { createRef, useState } from "react";
import PropTypes from "prop-types";
import { ProjectsCarousel } from "../ProjectsCarousel";
import { IoClose } from "react-icons/io5";

export default function Projects() {
    const modal = createRef(null);
    const [direction, setDirection] = useState(null);

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
            <h2 className="text-secondary w-full py-10 text-center text-4xl font-bold tracking-widest uppercase">Projects</h2>
            <dialog ref={modal} className="modal" onKeyDown={(e) => onModalChangeRequest(e.key)}>
                <ProjectModal currentProject={currentProject} />
            </dialog>
            <ProjectsCarousel onClick={openModal} />
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
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Director:</p>
                                <p className="w-1/2 text-left">{project.director}</p>
                            </div>
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Producer:</p>
                                <p className="w-1/2 text-left">{project.producer}</p>
                            </div>
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
                                    className="text-primary hover:text-secondary cursor-pointer text-center"
                                >
                                    YOUTUBE
                                </a>
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
