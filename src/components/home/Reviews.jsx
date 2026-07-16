import PropTypes from "prop-types";
import { BsInstagram } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import noise from "../../assets/icons/noise.svg";
import barcode from "../../assets/images/services/code.png";
import { useRef, useState } from "react";

const photoImgs = import.meta.glob("../../assets/images/reviews/*.webp", { eager: true, query: "?url" });
const photos = Object.keys(photoImgs).reduce((obj, k) => Object.assign(obj, { [k.split("/").pop()]: photoImgs[k].default }), {});

const reviews = [
    {
        name: "Anthony Q. Farrell",
        photo: "aqf.webp",
        credentials: "President, CEO - Canfro Productions, ULC",
        content:
            "We worked with Safe & Sound on our sketch series These Triggas and they were amazing. So professional and easy to work with. They also had some fun creative ideas that helped to make the sketches better. The whole process was great. We'll definitely be back with some of our other projects.",
        ig_url: "https://www.instagram.com/aqfarrell/",
    },
    {
        name: "Spencer Lackey",
        photo: "spencer.webp",
        credentials: "Director of You Are Here",
        content:
            "Working with Safe and Sound on our horror film was a delight. Thom and Michael imbued our sound design with such creativity and precision while also maintaining a chill, stress-free environment. They really elevated our film. Cant wait to work with them again!",
        ig_url: "https://www.instagram.com/spangerlookrey/",
    },
    {
        name: "Connie Wang",
        photo: "connie.webp",
        credentials: "Comedian and Producer of Canadian Famous (2024)",
        content:
            "It was a joy and pleasure to work with the Safe and Sound team on my one hour stand up special. Thom was quick to respond, always in communication, and was committed to doing great work. The whole experience was seamless and I was super happy with the final product.\nI highly recommend working with Safe and Sound post production!",
        ig_url: "https://www.instagram.com/conniewang_/",
    },
    {
        name: "Katie Uhlmann",
        photo: "katie.webp",
        credentials: "Director of Cows Come Home & When You Know You Know",
        content:
            "The team at Safe and Sound are energetic, creative, and technically proficient. They ask good questions and get into the lives of the characters and the world of the story. They are always dedicated to bringing the director’s vision to fruition while developing the ideas at the centre of the film into singular, engaging clarity.",
        ig_url: "https://www.instagram.com/katieuhlmann/",
    },
    {
        name: "Lindsay Middleton",
        photo: "lindsay.webp",
        credentials: "Producer of Cows Come Home",
        content:
            "You won't find a more enthusiastic and hard-working team than the folks at Safe & Sound Post!\nFrom start to finish, your vision is taken from a concept to a fully realized sound that is both collaborative and carefully created.\nThom, Jesse, and the entire team are passionate, and diligent and bring finesse and precision to everything I have been fortunate to work on with them.\nDon't look any further than Safe & Sound Post for any of your post-production sound needs.",
        ig_url: "https://www.instagram.com/lalalindseym/",
    },
    {
        name: "Bryn McAuley",
        photo: "bryn.webp",
        credentials: "Award-Winning Voice Actor & Director/Writer",
        content:
            "Choose Safe & Sound and you'll be glad you did!! Thom and Jesse are attentive, collaborative and a dream to work with. These two are major supporters of creators at every level, from indie to network to major studios. They are great communicators, true lovers of storytelling, and also really fun to be around. I will come back to them for everything I do!",
        ig_url: "https://www.instagram.com/brynmcauley/",
    },
    {
        name: "Jade Yurich",
        photo: "jade.webp",
        credentials: "Director of After You & Figures",
        content:
            "Working with the team at Safe & Sound felt like we were working with our best friends and family. They made the workdays very easy on us creatively and helped get our vision across every step of the way.",
        ig_url: "https://www.instagram.com/jadeyurich/",
    },
    {
        name: "Janet Rose Nguyen",
        photo: "janet.webp",
        credentials: "Director of Motion to Approve, I'm a Big Fan",
        content:
            "Jesse and Thomas are amazing collaborators and sound engineers/designers. They truly take a film to the next level and enhance the story, characters, and visuals using their talented sound design. Their expertise is a gift to any filmmaker looking to collaborate with them!",
        ig_url: "https://www.instagram.com/janetrose.nguyen/",
    },
    {
        name: "Dexter Wilson",
        photo: "dexter.webp",
        credentials: "Director of Diabolika (2024)",
        content:
            "The Safe & Sound crew are true masters of their craft. I enjoyed collaborating with these professionals every step of the way. They were able to bring their creativity, expertise and experience to create an immersive sound design for my short film.",
    },
    {
        name: "Jamie Hegland",
        photo: "jamie.webp",
        credentials: "Director of FIGURES (2022)",
        content:
            "Their work ethic, great attitudes and quality of work make them an undeniable force in this industry. They completely surpassed my expectations and in the end, the sound was my favourite part of the film and was one of the biggest impacts on its success.",
        ig_url: "https://www.instagram.com/jamie_hegland/",
    },
    {
        name: "Maxine Lemieux",
        photo: "maxine.webp",
        credentials: "Director of A Great Big Terrible Dream (2022)",
        content:
            "I had a great time working with Safe & Sound on my thesis project. They made me feel welcomed and comfortable in a studio setting. They were willing to experiment and bring my film to a higher level. Because of them, it was awarded best sound design for a festival.",
        ig_url: "https://www.instagram.com/maxine_lemieux/",
    },
    {
        name: "Erik Berg",
        photo: "erik.webp",
        credentials: "Director of First Born, Local Water, Mother Daughter",
        content:
            "Working with Safe and Sound is an absolute joy. They are kind, collaborative, and so talented. The team elevated the film through their brilliant sound design and I can’t wait to work with them again.",
    },
];

// Names shown in the home-page rotation; the reviews page shows the full list.
const featured_names = ["Anthony Q. Farrell", "Katie Uhlmann", "Spencer Lackey", "Connie Wang"];
const featured_rotation = featured_names.map((name) => reviews.find((x) => x.name === name)).filter(Boolean);

// Reviews page hierarchy: these lead as full-width pull quotes, the rest
// flow into the compact masonry wall below.
const marquee_names = ["Anthony Q. Farrell", "Katie Uhlmann", "Bryn McAuley"];
const marquee_reviews = marquee_names.map((name) => reviews.find((x) => x.name === name)).filter(Boolean);
const wall_reviews = reviews.filter((x) => !marquee_names.includes(x.name));

export default function Reviews({ featuredOnly = false }) {
    const rotation = featuredOnly ? featured_rotation : reviews;
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("next");
    const touchX = useRef(null);

    const prev = () => {
        setDirection("prev");
        setCurrent((current - 1 + rotation.length) % rotation.length);
    };
    const next = () => {
        setDirection("next");
        setCurrent((current + 1) % rotation.length);
    };
    const goTo = (i) => {
        setDirection(i > current ? "next" : "prev");
        setCurrent(i);
    };

    // Full reviews page: marquee pull quotes up top, compact wall below.
    if (!featuredOnly) {
        return (
            <section id="reviews" className="m-auto flex w-full flex-col items-center justify-center gap-14 pt-5 pb-10 md:gap-20">
                <div className="flex w-full max-w-5xl flex-col gap-14 md:gap-20">
                    {marquee_reviews.map((review, i) => (
                        <MarqueeReview key={review.name} review={review} flip={i % 2 === 1} />
                    ))}
                </div>
                <div className="flex flex-col items-center select-none">
                    <img className="h-10 select-none" draggable="false" src={barcode} alt="" aria-hidden="true" />
                    <span className="text-primary m-0 p-0 text-center text-sm uppercase">safe&amp;sØundpost</span>
                </div>
                <div className="flex w-full max-w-6xl flex-wrap items-stretch justify-center gap-6">
                    {wall_reviews.map((review) => (
                        <ReviewCard key={review.name} review={review} compact />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="reviews" className="m-auto flex w-full flex-col items-center justify-center gap-10 pt-5">
            <div className="flex w-full items-center justify-center gap-2 md:gap-6">
                <button
                    className="text-primary hover:text-secondary hidden shrink-0 cursor-pointer p-1 transition-colors md:block md:p-2"
                    onClick={prev}
                    aria-label="Previous review"
                >
                    <IoChevronBack className="size-8 md:size-10" />
                </button>
                <div
                    key={current}
                    className={`animate-duration-500 animate-ease-out flex w-full max-w-4xl justify-center ${direction === "next" ? "animate-fade-left" : "animate-fade-right"}`}
                    onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchX.current;
                        touchX.current = null;
                        if (dx < -40) next();
                        else if (dx > 40) prev();
                    }}
                >
                    <ReviewCard review={rotation[current]} />
                </div>
                <button
                    className="text-primary hover:text-secondary hidden shrink-0 cursor-pointer p-1 transition-colors md:block md:p-2"
                    onClick={next}
                    aria-label="Next review"
                >
                    <IoChevronForward className="size-8 md:size-10" />
                </button>
            </div>
            <div className="flex gap-2">
                {rotation.map((x, i) => (
                    <button
                        key={x.name}
                        onClick={() => goTo(i)}
                        aria-label={`Show review by ${x.name}`}
                        className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${current === i ? "w-6 bg-[#a9c2e0]" : "w-2 bg-white/40"}`}
                    />
                ))}
            </div>
        </section>
    );
}

Reviews.propTypes = {
    featuredOnly: PropTypes.bool,
};

function MarqueeReview({ review, flip = false }) {
    return (
        <div className={`text-primary flex flex-col items-center gap-6 px-4 md:gap-12 ${flip ? "md:flex-row-reverse" : "md:flex-row"}`}>
            {review.photo && (
                <img
                    className="h-40 w-40 shrink-0 rounded-3xl object-cover select-none md:h-56 md:w-56"
                    src={photos[review.photo]}
                    alt={review.name}
                    draggable="false"
                />
            )}
            <div className="flex flex-col gap-4 md:gap-5">
                <p className="text-center text-lg leading-relaxed font-semibold whitespace-pre-wrap italic md:text-left md:text-2xl md:leading-relaxed">
                    &ldquo;{review.content}&rdquo;
                </p>
                <div className={`flex items-center justify-center gap-3 md:justify-start ${flip ? "md:flex-row-reverse md:self-end" : ""}`}>
                    <div className={`flex flex-col ${flip ? "md:items-end" : ""}`}>
                        <span className="text-xl font-bold tracking-widest uppercase">{review.name}</span>
                        <span className="text-secondary text-sm md:text-base">{review.credentials}</span>
                    </div>
                    {review.ig_url && (
                        <a className="hover:text-secondary p-1 transition-colors" href={review.ig_url} target="_blank" rel="noopener noreferrer">
                            <BsInstagram className="size-6" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

MarqueeReview.propTypes = {
    review: PropTypes.object,
    flip: PropTypes.bool,
};

function ReviewCard({ review, compact = false }) {
    return (
        <div
            className={`card text-primary-content rounded-l-4xl rounded-r-sm bg-blend-soft-light ${
                compact
                    ? "h-64 w-full min-w-[15rem] py-5 pl-4 md:max-w-[30rem] md:min-w-[30rem]"
                    : "my-auto min-h-56 w-full py-6 pl-4 md:min-h-80 md:py-10 md:pl-8"
            }`}
            style={{
                background: `linear-gradient(to right, var(--color-primary), var(--color-primary)), url("${noise}")`,
            }}
        >
            {!review.photo && <div className="absolute mt-4 h-6 w-6 shrink-0 self-start rounded-full bg-black"></div>}
            <div className="card-body my-auto ml-2 h-10/12 max-h-10/12 min-h-10/12 justify-start py-0">
                <div className="inline-flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-5">
                        {review.photo && (
                            <img
                                className={`shrink-0 rounded-2xl object-cover select-none ${compact ? "h-14 w-14" : "h-16 w-16 md:h-24 md:w-24 md:rounded-3xl"}`}
                                src={photos[review.photo]}
                                alt={review.name}
                                draggable="false"
                            />
                        )}
                    <h2 className={`card-title flex flex-col items-start justify-start gap-0 text-left ${compact ? "text-lg" : "text-xl md:text-3xl"}`}>
                        {review.name}
                        {review.credentialsUrl && review.credentialsLinkText ? (
                            <span className="text-sm md:text-base">
                                {review.credentials.replace(review.credentialsLinkText, "")}
                                <a className="hover:underline" href={review.credentialsUrl} target="_blank" rel="noopener noreferrer">{review.credentialsLinkText}</a>
                            </span>
                        ) : (
                            <span className="text-sm md:text-base">{review.credentials}</span>
                        )}
                    </h2>
                    </div>
                    {review.ig_url && (
                        <a className="btn btn-lg btn-primary btn-circle btn-ghost self-start p-1" href={review.ig_url} target="_blank">
                            <BsInstagram className="size-7 text-black" />
                        </a>
                    )}
                </div>
                <span
                    className={`review-content h-fit max-h-32 overflow-y-auto whitespace-pre-wrap ${
                        compact ? "text-sm leading-relaxed" : "md:max-h-64 md:text-lg md:leading-relaxed"
                    }`}
                >
                    {review.content}
                </span>
            </div>
        </div>
    );
}

ReviewCard.propTypes = {
    review: PropTypes.object,
    compact: PropTypes.bool,
};
