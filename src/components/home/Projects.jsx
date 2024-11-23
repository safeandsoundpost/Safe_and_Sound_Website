import { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const projectDetails = [
    {
        poster: "diabolikaPosterBlackDone",
        title: "DIABOLIKA",
        released: "2024",
        director: "Dexter Wilson",
        producer: "Randy Singh, Dexter Wilson",
        imdb: "https://www.imdb.com/title/tt22899096/?ref_=fn_al_tt_1",
    },
    {
        poster: "facesPoster",
        title: "Faces",
        released: "TBA",
        director: "Paul Persic",
    },
    {
        poster: "figuresAlternatePoster",
        title: "FIGURES",
        released: "2022",
        director: "Jamie Hegland, Jade Yurich",
        producer: "Jamie Hegland, Jade Yurich",
        imdb: "https://www.imdb.com/title/tt14796714/?ref_=nm_knf_c_1",
    },
    {
        poster: "taxiAlongTheBridgePoster",
        title: "Taxi Along the Bridge",
        released: "2023",
        director: "Paul Persic",
        producer: "Antonia Sinn",
        imdb: "https://www.imdb.com/title/tt25666636/?ref_=nv_sr_srsg_0_tt_2_nm_0_q_taxi%2520along%2520th",
    },
    {
        poster: "wykykPosterV2",
        title: "When You Know You Know",
        released: "2024",
        director: "Katie Uhlmann",
        producer: "Katie Uhlmann, Nick Hendrik",
        imdb: "https://www.imdb.com/title/tt28481154/?ref_=nm_flmg_unrel_1_prd",
    },
    {
        poster: "a-great-big-terrible-dream",
        title: "A great big terrible dream",
        released: "2024",
        director: "Maxine Lemieux",
        producer: "Maxine Lemieux",
        ytsrc: "https://www.youtube.com/watch?v=WFYjwC8b6DU",
    },
];

export default function Projects() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [quantity, setQuantity] = useState(4);

    const modal = createRef(null);
    /**
     * @type {[{ project: object, image: string } | null, React.Dispatch<React.SetStateAction<{ project: object, image: string }>>]}
     */
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const img_paths = Object.values(
            import.meta.glob("@projects/*.{png,jpg,jpeg,PNG,JPEG}", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);

        projectDetails.forEach((project) => {
            const img = img_paths.find((x) => x.includes(project.poster));
            project.poster = img;
        });

        const img = projectDetails.map((project) => project.poster);
        setImages(img);
    }, []);

    useEffect(() => {
        const handleResize = (event) => {
            if (event.target.innerWidth >= 640) {
                setQuantity(1);
                setPage(1);
            }
            if (event.target.innerWidth >= 900) { //1050
                setQuantity(2);
                setPage(1);
            }
            if (event.target.innerWidth >= 1450) {
                setQuantity(3);
                setPage(1);
            }
            if (event.target.innerWidth >= 1920) {
                setQuantity(4);
                setPage(1);
            }
        };

        handleResize({ target: window });

        window.addEventListener("resize", (event) => handleResize(event), true);
        return window.removeEventListener(
            "resize",
            (event) => handleResize(event),
            true,
        );
    }, []);

    const openModal = (currentProject) => {
        setCurrentProject(currentProject);
        modal.current.showModal();
    };

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
            <div className="carousel gap-5 md:hidden">
                {images &&
                    images.map((image, index) => (
                        <div
                            className="carousel-item w-3/4 cursor-pointer border-2 border-primary p-3"
                            onClick={() =>
                                openModal({
                                    project: projectDetails[index],
                                    image,
                                })
                            }
                            key={index}
                        >
                            <img
                                draggable="false"
                                className="aspect-[12/16] h-full w-fit select-none object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                src={image}
                                alt={`project-${index}`}
                            />
                        </div>
                    ))}
            </div>
            <div className="flex w-fit items-center justify-center gap-5 overflow-auto align-middle max-md:hidden md:w-full md:gap-1 lg:gap-0 xl:gap-5">
                <button
                    className={`z-50 h-20 w-20 md:btn-md xl:btn-lg ${page === 1 ? "pointer-events-none" : "btn btn-square btn-ghost"}`}
                    onClick={() => pageMove(-1)}
                >
                    <svg
                        className={`mr-2 fill-primary hover:fill-secondary ${page === 1 ? "hidden" : ""}`}
                        width="80%"
                        height="80%"
                        viewBox="0 0 5 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 0L0 5L5 10V0Z" />
                    </svg>
                </button>
                <div className="clear-both flex w-full max-w-fit items-center justify-center gap-5 align-middle max-md:hidden">
                    {images &&
                        images
                            .slice((page - 1) * quantity, page * quantity)
                            .map((image, index) => {
                                const projectIndex =
                                    (page - 1) * quantity + index;
                                return (
                                    <div
                                        className="z-30 cursor-pointer border-2 border-primary p-3"
                                        key={index}
                                        onClick={() =>
                                            openModal({
                                                project:
                                                    projectDetails[
                                                        projectIndex
                                                    ],
                                                image,
                                            })
                                        }
                                    >
                                        <img
                                            draggable="false"
                                            className="aspect-[12/16] h-[22rem] w-fit md:max-w-48 lg:max-w-52 xl:max-w-56 select-none object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                            src={image}
                                            alt={`project-${index}`}
                                        />
                                    </div>
                                );
                            })}
                </div>
                <button
                    className="btn btn-square btn-ghost h-20 w-20 md:btn-md xl:btn-lg"
                    onClick={() => pageMove(1)}
                >
                    <svg
                        className={`ml-2 fill-primary hover:fill-secondary ${page * quantity >= images.length ? "hidden" : ""}`}
                        width="80%"
                        height="80%"
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
            <div className="modal-box max-w-full bg-[#1a1a1a] max-md:p-3 md:max-w-6xl">
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
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                    <img className="aspect-auto rounded-3xl" src={image} />
                    <div className="flex flex-col items-center justify-center gap-2 align-middle md:gap-12">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-primary md:text-4xl">
                            {project.title}
                        </h3>
                        <div className="flex w-full flex-col gap-5 text-xs font-semibold md:w-2/3 md:text-2xl">
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Released:</p>
                                <p className="w-1/2 text-left">
                                    {project.released}
                                </p>
                            </div>
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Director:</p>
                                <p className="w-1/2 text-left">
                                    {project.director}
                                </p>
                            </div>
                            <div className="flex w-full justify-between">
                                <p className="w-1/2">Producer:</p>
                                <p className="w-1/2 text-left">
                                    {project.producer}
                                </p>
                            </div>
                            {project.imdb && (
                                <a
                                    href={project.imdb}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer text-center text-primary hover:text-secondary"
                                >
                                    IMDB
                                </a>
                            )}
                            {project.ytsrc && (
                                <a
                                    href={project.ytsrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer text-center text-primary hover:text-secondary"
                                >
                                    YOUTUBE
                                </a>
                            )}
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
        image: PropTypes.string,
    }),
};
