import useEmblaCarousel from "embla-carousel-react";
import autoScroll from "embla-carousel-auto-scroll";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const projectDetails = [
    {
        poster: "YouAreHere",
        title: "You Are Here",
        released: "TBA",
        director: "Spencer Lackey",
        producer: "Ryan Vergara",
    },
    {
        poster: "MTA",
        title: "Motion To Approve",
        released: "2024",
        director: "Janet-Rose Nguyen",
        producer: "Connie Wang and Janet-Rose Nguyen",
        imdb: "https://m.imdb.com/title/tt33594182/?ref_=nm_flmg_job_5_unrel_t_1",
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
        poster: "facesPoster",
        title: "Faces",
        released: "TBA",
        director: "Paul Persic",
    },
    {
        poster: "diabolikaPosterBlackDone",
        title: "DIABOLIKA",
        released: "2024",
        director: "Dexter Wilson",
        producer: "Randy Singh, Dexter Wilson",
        imdb: "https://www.imdb.com/title/tt22899096/?ref_=fn_al_tt_1",
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
        poster: "imabigfan",
        title: "I'm A Big Fan",
        released: "2024",
        director: "Janet-Rose Nguyen",
        producer: "Janet-Rose Nguyen",
        imdb: "https://m.imdb.com/title/tt32656761/?ref_=nm_flmg_job_1_cred_t_1",
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

export function ProjectsCarousel(props) {
    /**
     * @type {[{ poster: string, posterSrc: string } | null, React.Dispatch<React.SetStateAction<{ poster: string, posterSrc: string }>>]}
     */
    const [images, setImages] = useState([]);

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        autoScroll({
            playOnInit: true,
            speed: 1,
            startDelay: 1000,
            stopOnInteraction: false,
        }),
    ]);

    useEffect(() => {
        const img_paths = Object.values(
            import.meta.glob("@projects/*.webp", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);

        // console.log(img_paths);

        projectDetails.forEach((project) => {
            const img = img_paths.find((x) => x.includes(project.poster));
            if (!img) {
                console.error(`Image not found for ${project.title}`);
                return;
            }
            project.poster = img;
            project.posterSrc = img;
        });

        const img = projectDetails.map((project) => ({
            poster: project.poster,
            posterSrc: project.posterSrc,
        }));
        setImages(img);
    }, []);

    return (
        <div className="w-full overflow-hidden md:ml-auto md:w-11/12 xl:ml-0 xl:w-full" ref={emblaRef}>
            <div className="flex">
                {images &&
                    images.map((x, i) => {
                        return (
                            <div
                                className="min-w-0 shrink-0 grow-0 pl-7"
                                key={i}
                                onClick={() => {
                                    props.onClick({
                                        project: projectDetails[i],
                                        image: x,
                                    });
                                }}
                            >
                                <div className="border-primary z-30 cursor-pointer border-2 p-3">
                                    <img
                                        draggable="false"
                                        className="aspect-12/16 h-[22rem] w-fit object-cover transition-transform duration-300 ease-in-out select-none hover:scale-105 md:max-w-48 lg:max-w-52 xl:max-w-56"
                                        src={x.posterSrc}
                                        alt={x.poster}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

ProjectsCarousel.propTypes = {
    onClick: PropTypes.func,
};
