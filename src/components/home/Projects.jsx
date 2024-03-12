import { useEffect, useState } from "react";
import PropTypes from "prop-types";
        
function ProjectModal({ project, onClose }) {
    if (!project) return null;
        
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-4 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <ul>
                    <li>Released: {project.released}</li>
                    <li>Director: {project.director}</li>
                    {project.producer && <li>Producer: {project.producer}</li>}
                    {project.imdb && (
                        <li>
                                    IMDB:{" "}
                            <a href={project.imdb} target="_blank" rel="noopener noreferrer">
                                {project.imdb}
                            </a>
                        </li>
                    )}
                </ul>
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl cursor-pointer">
                            &times;
                </button>
            </div>
        </div>
    );
}
ProjectModal.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        released: PropTypes.string.isRequired,
        director: PropTypes.string,
        directors: PropTypes.arrayOf(PropTypes.string),
        producer: PropTypes.string,
        producers: PropTypes.arrayOf(PropTypes.string),
        imdb: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};
        
export default function Projects() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
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
        const img = Object.values(import.meta.glob("@projects/*.{png,jpg,jpeg,PNG,JPEG}", {
            eager: true,
            query: "?url",
        })).map((x) => x.default);
        setImages(img);
    }, []);
        
    const openModal = (project) => {
        setCurrentProject(project);
        setShowModal(true);
    };
        
    const closeModal = () => {
        setShowModal(false);
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
        <section id="projects" className="w-full py-10 relative">
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                        Projects
            </h2>
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
                    images.slice((page - 1) * quantity, page * quantity).map((image, index) => {
                        const projectIndex = ((page - 1) * quantity) + index;
                        return (
                            <div
                                className="w-fit border-2 border-primary p-3 cursor-pointer"
                                key={index} 
                                onClick={() => openModal(projectDetails[projectIndex])}
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
            {showModal && <ProjectModal project={currentProject} onClose={closeModal} />}
        </section>
    );
}