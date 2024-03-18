import { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} params
 * @param {{ project: object, image: string }} params.currentProject
 * @returns
 */
function ProjectModal({ currentProject }) {
    if (!currentProject) return <></>;

    const { project, image } = currentProject;

    if (!project) return <></>;

    return (
        <>
            <div className="modal-box max-w-6xl">
                <div className="grid grid-cols-2 gap-5">
                    <img className="aspect-auto rounded-3xl" src={image} />
                    <div className="flex flex-col items-center justify-center gap-12 align-middle">
                        <h3 className="text-4xl font-bold uppercase tracking-widest text-primary">
                            {project.title}
                        </h3>
                        <div className="flex w-2/3 flex-col gap-5 text-2xl font-semibold">
                            <div className="flex justify-between w-full">
                                <p className="w-1/2">Released:</p>
                                <p className="text-left w-1/2">{project.released}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="w-1/2">Director:</p>
                                <p className="text-left w-1/2">{project.director}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="w-1/2">Producer:</p>
                                <p className="text-left w-1/2">{project.producer}</p>
                            </div>
                            {project.imdb && (
                                <a
                                    href={project.imdb}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer text-primary hover:text-secondary text-center"
                                >
                                    IMDB
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

            {/* <div
                className="relative w-full max-w-lg bg-white p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold">{project.title}</h3>
                <ul>
                    <li>Released: {project.released}</li>
                    <li>Director: {project.director}</li>
                    {project.producer && <li>Producer: {project.producer}</li>}
                    {project.imdb && (
                        <li>
                            IMDB:{" "}
                            <a
                                href={project.imdb}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.imdb}
                            </a>
                        </li>
                    )}
                </ul>
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 cursor-pointer text-2xl"
                >
                    &times;
                </button>
            </div> */}
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
        }),
        image: PropTypes.string,
    }),
};

export default function Projects() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    // const [showModal, setShowModal] = useState(false);
    const modal = createRef(null);
    /**
     * @type {[{ project: object, image: string } | null, React.Dispatch<React.SetStateAction<{ project: object, image: string }>>]}
     */
    const [currentProject, setCurrentProject] = useState(null);
    const quantity = 4;

    const projectDetails = [
        {
            title: "DIABOLIKA",
            released: "2024",
            director: "Dexter Wilson",
            producer: "Randy Singh, Dexter Wilson",
            imdb: "https://www.imdb.com/title/tt22899096/?ref_=fn_al_tt_1",
        },
        {
            title: "Faces",
            released: "TBA",
            director: "Paul Persic",
        },
        {
            title: "FIGURES",
            released: "2022",
            directors: "Jamie Hegland, Jade Yurich",
            producers: "Jamie Hegland, Jade Yurich",
            imdb: "https://www.imdb.com/title/tt14796714/?ref_=nm_knf_c_1",
        },
        {
            title: "Taxi Along the Bridge",
            released: "2023",
            director: "Paul Persic",
            producer: "Antonia Sinn",
            imdb: "https://www.imdb.com/title/tt25666636/?ref_=nv_sr_srsg_0_tt_2_nm_0_q_taxi%2520along%2520th",
        },
        {
            title: "When You Know You Know",
            released: "2024",
            director: "Katie Uhlmann",
            producer: "Katie Uhlmann, Nick Hendrik",
            imdb: "https://www.imdb.com/title/tt28481154/?ref_=nm_flmg_unrel_1_prd",
        },
    ];

    useEffect(() => {
        const img = Object.values(
            import.meta.glob("@projects/*.{png,jpg,jpeg,PNG,JPEG}", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);
        setImages(img);
    }, []);

    const openModal = (currentProject) => {
        setCurrentProject(currentProject);
        modal.current.showModal();
    };

    // const closeModal = () => setShowModal(false);

    const pageMove = (_amount) => {
        setPage((prev) => {
            const next = prev + _amount;
            if (next < 1 || next > Math.ceil(images.length / quantity)) {
                return prev;
            }
            return next;
        });
    };

    return (
        <section id="projects" className="relative w-full py-10">
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                Projects
            </h2>
            <dialog ref={modal} className="modal">
                <ProjectModal currentProject={currentProject} />
            </dialog>
            <div className="flex w-full items-center justify-center gap-5 align-middle">
                <button className="h-20 w-20" onClick={() => pageMove(-1)}>
                    <svg
                        className={`fill-primary hover:fill-secondary ${page === 1 ? "hidden" : ""}`}
                        width="100%"
                        height="100%"
                        viewBox="0 0 5 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 0L0 5L5 10V0Z" />
                    </svg>
                </button>
                {images &&
                    images
                        .slice((page - 1) * quantity, page * quantity)
                        .map((image, index) => {
                            const projectIndex = (page - 1) * quantity + index;
                            return (
                                <div
                                    className="w-fit cursor-pointer border-2 border-primary p-3"
                                    key={index}
                                    onClick={() =>
                                        openModal({
                                            project:
                                                projectDetails[projectIndex],
                                            image,
                                        })
                                    }
                                >
                                    <img
                                        draggable="false"
                                        className="aspect-[12/16] h-[22rem] w-fit select-none object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                        src={image}
                                        alt={`project-${index}`}
                                    />
                                </div>
                            );
                        })}
                <button className="h-20 w-20" onClick={() => pageMove(1)}>
                    <svg
                        className={`fill-primary hover:fill-secondary ${page * quantity >= images.length ? "hidden" : ""}`}
                        width="100%"
                        height="100%"
                        viewBox="0 0 5 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 10L5 5L0 0V10Z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
