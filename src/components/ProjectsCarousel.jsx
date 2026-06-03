import useEmblaCarousel from "embla-carousel-react";
import autoScroll from "embla-carousel-auto-scroll";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const projectDetails = [
    {
        poster: "YouAreHere",
        title: "You Are Here",
        released: "2025",
        director: "Spencer Lackey",
        producer: "Ryan Vergara",
        ytsrc: "https://www.youtube.com/watch?v=yZwAbJZTie4",
        imdb: "https://www.imdb.com/title/tt35303589/",
    },
    {
        poster: "MTA",
        title: "Motion To Approve",
        released: "2024",
        director: "Janet-Rose Nguyen",
        producer: "Connie Wang and Janet-Rose Nguyen",
        imdb: "https://m.imdb.com/title/tt33594182/?ref_=nm_flmg_job_5_unrel_t_1",
        ytsrc: "https://www.youtube.com/watch?v=Q9CZ9K29hoE",
    },
    {
        poster: "wykykPosterV2",
        title: "When You Know You Know",
        released: "2024",
        director: "Katie Uhlmann",
        producer: "Katie Uhlmann, Nick Hendrik",
        imdb: "https://www.imdb.com/title/tt28481154/?ref_=nm_flmg_unrel_1_prd",
        trailer: "https://www.youtube.com/watch?v=qgPQLg9M9hE",
    },
    {
        poster: "facesPoster",
        title: "Faces",
        released: "TBA",
        director: "Paul Persic",
        producer: "Eric Tomj",
        ytsrc: "https://vimeo.com/858918084/984e5e1dea",
    },
    {
        poster: "diabolikaPosterBlackDone",
        title: "DIABOLIKA",
        released: "2024",
        director: "Dexter Wilson",
        producer: "Randy Singh, Dexter Wilson",
        imdb: "https://www.imdb.com/title/tt22899096/?ref_=fn_al_tt_1",
        ytsrc: "https://www.youtube.com/watch?v=RxxxMKE_o9k&t=64s",
    },
    {
        poster: "figuresAlternatePoster",
        title: "FIGURES",
        released: "2022",
        director: "Jamie Hegland, Jade Yurich",
        producer: "Jamie Hegland, Jade Yurich",
        imdb: "https://www.imdb.com/title/tt14796714/?ref_=nm_knf_c_1",
        ytsrc: "https://www.youtube.com/watch?v=lcStRnhHeAo",
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
    {
        poster: "after-you",
        title: "After You",
        released: "2025",
        director: "Jade Yurich",
        producer: "Angelica Falco (Executive Producer), Jade Leo Yurich (Line Producer)",
        imdb: "https://www.imdb.com/title/tt27483726/",
        ytsrc: "https://www.youtube.com/watch?v=4wNN-vewgpI",
    },
    {
        poster: "cowscomehome",
        title: "Cows Come Home",
        released: "2025",
        director: "Katie Uhlmann",
        producer: "David Carruthers (Executive Producer), Keri Ferencz (Executive Producer), Lindsey Middleton (Executive Producer), Katie Uhlmann (Executive Producer)",
        imdb: "https://www.imdb.com/title/tt34625419/?ref_=fn_all_ttl_1",
        ytsrc: "https://tv1.bell.ca/fibetv1/shows/cows-come-home",
        website: "https://cowscomehome.ca/",
    },
    {
        poster: "Dontberude",
        title: "Don’t Be Rude",
        released: "2025",
        director: "Jessica Hof",
        producer: "Enrique Baniqued",
        imdb: "https://www.imdb.com/title/tt37091078/?ref_=ext_shr_lnk",
    },
    {
        poster: "EyesWideOpen",
        title: "Eyes Wide Open",
        released: "2025",
        director: "Jade Yurich",
        producer: "Joseph Claude Dubois (Executive Producer), Ruban Singh (Associate Producer), Jade Leo Yurich (Producer)",
        imdb: "https://www.imdb.com/title/tt36847174/?ref_=fn_all_ttl_7",
    },
    {
        poster: "tgs_poster_portrait",
        title: "The Tough, The Gentle, and The Strong",
        released: "2025",
        director: "Richard Dang",
        producer: "Connie Wang",
        ytsrc: "https://www.youtube.com/watch?v=ofyil4Fa33o&t=1s",
    },
    {
        poster: "burdened",
        title: "Burdened",
        released: "2025",
        director: "Conor Forrest",
        producer: "Ryan Bannon (Executive Producer), Meaghan Brown (Associate Producer), Devon Codrington (Producer), Christopher Forrest (Executive Producer), Conor Forrest (Executive Producer), Käroli Grenman (Associate Producer), Arteen Khalatbari (Executive Producer), Sandra Landolt (Executive Producer), Stacey McInnes (Associate Producer), Alex Melichar (Executive Producer), Paul Persic (Producer), Kelly Smith (Associate Producer)",
        imdb: "https://www.imdb.com/title/tt36374220/",
    },
    {
        poster: "dimes",
        title: "Dimes",
        released: "2025",
        director: "Paul Persic",
        producer: "",
    },
    {
        poster: "lichun",
        title: "Lichun",
        released: "2025",
        director: "Paul Persic",
        producer: "Devon Codrington",
        imdb: "https://www.imdb.com/title/tt37835589/",
    },
    {
        poster: "noodles",
        title: "Noodles",
        released: "2025",
        director: "Paul Persic",
        producer: "Devon Codrington, Tristen Huang, Paul Persic",
        imdb: "https://www.imdb.com/title/tt37381235/",
    },
    {
        poster: "these-triggas",
        title: "These Triggas",
        released: "2025",
        director: "Cory Bowles",
        producer: "Matthew Chenuz, Devon Codrington, Lex Emanuel, Anthony Q. Farrell, Moné Flowers",
        imdb: "https://www.imdb.com/title/tt36104189/",
        ytsrc: "https://www.youtube.com/@TheseTriggas",
    },
    {
        poster: "trapped",
        title: "Trapped",
        released: "2025",
        director: "Paul Persic",
        producer: "Devon Codrington, Lex Emanuel, Paul Persic",
        imdb: "https://www.imdb.com/title/tt37364469/",
    },
];

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function useResolvedImages() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const img_paths = Object.values(
            import.meta.glob("@projects/*.webp", { eager: true, query: "?url" }),
        ).map((x) => x.default);

        const resolved = projectDetails.flatMap((project) => {
            const src = img_paths.find((x) => x.includes(project.poster));
            if (!src) return [];
            return [{ ...project, posterSrc: src }];
        });

        setImages(shuffleArray(resolved));
    }, []);
    return images;
}

export function ProjectsCollage({ onClick }) {
    const images = useResolvedImages();

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full md:ml-auto md:w-11/12 xl:ml-0 xl:w-full">
            {images.map((img, i) => (
                <div
                    key={i}
                    className="cursor-pointer border-2 border-primary p-2 overflow-hidden"
                    onClick={() => onClick({ project: img, image: { posterSrc: img.posterSrc, poster: img.posterSrc } })}
                >
                    <img
                        draggable="false"
                        className="aspect-[12/16] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 select-none"
                        src={img.posterSrc}
                        alt={img.title}
                    />
                </div>
            ))}
        </div>
    );
}

ProjectsCollage.propTypes = {
    onClick: PropTypes.func,
};

export function ProjectsCarousel(props) {
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

        const resolved = projectDetails.flatMap((project) => {
            const src = img_paths.find((x) => x.includes(project.poster));
            if (!src) {
                console.error(`Image not found for ${project.title}`);
                return [];
            }
            return [{ ...project, posterSrc: src }];
        });

        setImages(shuffleArray(resolved));
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
                                        project: x,
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
