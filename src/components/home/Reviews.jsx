/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BsInstagram } from "react-icons/bs";
import noise from "../../assets/icons/noise.svg";

const reviews = [
    {
        name: "Anthony Q. Farrell",
        credentials: "President, CEO - Canfro Productions, ULC",
        content:
            "We worked with Safe & Sound on our sketch series These Triggas and they were amazing. So professional and easy to work with. They also had some fun creative ideas that helped to make the sketches better. The whole process was great. We'll definitely be back with some of our other projects.",
        ig_url: "https://www.instagram.com/aqfarrell/",
    },
    {
        name: "Spencer Lackey",
        credentials: "Director of You Are Here",
        content:
            "Working with Safe and Sound on our horror film was a delight. Thom and Michael imbued our sound design with such creativity and precision while also maintaining a chill, stress-free environment. They really elevated our film. Cant wait to work with them again!",
        ig_url: "https://www.instagram.com/spangerlookrey/",
    },
    {
        name: "Connie Wang",
        credentials: "Comedian and Producer of Canadian Famous (2024)",
        content:
            "It was a joy and pleasure to work with the Safe and Sound team on my one hour stand up special. Thom was quick to respond, always in communication, and was committed to doing great work. The whole experience was seamless and I was super happy with the final product.\nI highly recommend working with Safe and Sound post production!",
        ig_url: "https://www.instagram.com/conniewang_/",
    },
    {
        name: "Katie Uhlmann",
        credentials: "Director of When You Know You Know (2024)",
        content:
            "The team at Safe and Sound are energetic, creative, and technically proficient. They ask good questions and get into the lives of the characters and the world of the story. They are always dedicated to bringing the director’s vision to fruition while developing the ideas at the centre of the film into singular, engaging clarity.",
        ig_url: "https://www.instagram.com/katieuhlmann/",
    },
    {
        name: "Lindsay Middleton",
        credentials: "Producer of Cows Come Home",
        content:
            "You won't find a more enthusiastic and hard-working team than the folks at Safe & Sound Post!\nFrom start to finish, your vision is taken from a concept to a fully realized sound that is both collaborative and carefully created.\nThom, Jesse, and the entire team are passionate, and diligent and bring finesse and precision to everything I have been fortunate to work on with them.\nDon't look any further than Safe & Sound Post for any of your post-production sound needs.",
        ig_url: "https://www.instagram.com/lalalindseym/",
    },
    {
        name: "Erik Berg",
        credentials: "Director of First Born, and Local Water, Mother Daughter",
        content:
            "Working with Safe and Sound is an absolute joy. They are kind, collaborative, and so talented. The team elevated the film through their brilliant sound design and I can’t wait to work with them again.",
    },
    {
        name: "Jade Yurich",
        credentials: "Co-Director and Producer of FIGURES (2022)",
        content:
            "Working with the team at Safe & Sound felt like we were working with our best friends and family. They made the workdays very easy on us creatively and helped get our vision across every step of the way.",
        ig_url: "https://www.instagram.com/jadeyurich/",
    },
    {
        name: "Janet Rose Nguyen",
        credentials: "Director of Motion to Approve, I'm a Big Fan",
        content:
            "Jesse and Thomas are amazing collaborators and sound engineers/designers. They truly take a film to the next level and enhance the story, characters, and visuals using their talented sound design. Their expertise is a gift to any filmmaker looking to collaborate with them!",
        ig_url: "https://www.instagram.com/janetrose.nguyen/",
    },
    {
        name: "Dexter Wilson",
        credentials: "Director of Diabolika (2024)",
        content:
            "The Safe & Sound crew are true masters of their craft. I enjoyed collaborating with these professionals every step of the way. They were able to bring their creativity, expertise and experience to create an immersive sound design for my short film.",
    },
    {
        name: "Jamie Hegland",
        credentials: "Director of FIGURES (2022)",
        content:
            "Their work ethic, great attitudes and quality of work make them an undeniable force in this industry. They completely surpassed my expectations and in the end, the sound was my favourite part of the film and was one of the biggest impacts on its success.",
        ig_url: "https://www.instagram.com/jamie_hegland/",
    },
    {
        name: "Maxine Lemieux",
        credentials: "Director of A Great Big Terrible Dream (2022)",
        content:
            "I had a great time working with Safe & Sound on my thesis project. They made me feel welcomed and comfortable in a studio setting. They were willing to experiment and bring my film to a higher level. Because of them, it was awarded best sound design for a festival.",
        ig_url: "https://www.instagram.com/maxine_lemieux/",
    },
];

export default function Reviews() {
    const [selectedReview, setSelectedReview] = useState(null);

    return (
        <section
            id="reviews"
            className="m-auto flex w-full flex-col items-center justify-center gap-10 py-10 md:m-auto md:w-9/12 lg:w-10/12 xl:w-full"
        >
            <h2 className="text-secondary my-10 text-center text-4xl font-bold tracking-widest uppercase">
                Reviews
            </h2>
            <div className="carousel carousel-center rounded-box max-w-full snap-none space-x-8 overflow-x-scroll scroll-smooth p-4">
                {reviews
                    .reduce((prev, curr, i) => {
                        if (i % 3 === 0) prev.push([curr]);
                        else prev.at(-1).push(curr);
                        return prev;
                    }, [])
                    .map((rl, i) => (
                        <div
                            key={i}
                            className="carousel-item flex max-w-[30rem] min-w-[30rem] flex-col items-center justify-center gap-8"
                        >
                            {rl.map((x, j) => (
                                <ReviewCard key={j} review={x} />
                            ))}
                        </div>
                    ))}
            </div>
            {/* <div className="grid w-full grid-cols-1 justify-items-center gap-5 border-2 md:gap-8 xl:grid-cols-2">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div> */}
            {selectedReview && (
                <ReviewModal
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                />
            )}
        </section>
    );
}

function ReviewCard({ review }) {
    // const [onHover, setOnHover] = useState(false);
    // const [isMobile, setIsMobile] = useState(false); // just a workaround for touch events. Not the best solution.

    // return (
    //     <div
    //         id="review-card"
    //         className="xs:h-[120px] xs:pl-5 flex h-[130px] w-full items-center justify-start overflow-hidden rounded-l-[2em] border-2 border-red-500 bg-white pl-10 text-black md:h-[120px] md:pl-5 lg:h-[130px] xl:w-[380px] xl:pl-10 2xl:pl-10"
    //         onTouchStart={(e) => {
    //             setIsMobile(true);

    //             /** @type {HTMLElement} */
    //             const target = e.target;
    //             if (target.getAttribute("review-card-type") === "content")
    //                 return;
    //             setOnHover(!onHover);
    //         }}
    //         onMouseEnter={() => {
    //             if (isMobile) return;
    //             setOnHover(true);
    //         }}
    //         onMouseLeave={() => {
    //             if (isMobile) return;
    //             setOnHover(false);
    //         }}
    //         onBlur={() => {
    //             setOnHover(false);
    //         }}
    //     >
    //         <div className="h-6 w-6 self-start mt-5 shrink-0 rounded-full bg-black"></div>
    //         {(() => {
    //             if (onHover)
    //                 return (
    //                     <div className="ml-4 flex h-full items-center text-left">
    //                         <p
    //                             review-card-type="content"
    //                             className="h-[80%] w-[95%] overflow-y-auto text-sm leading-tight md:text-xs xl:text-sm 2xl:text-base"
    //                         >
    //                             {review.content}
    //                         </p>
    //                     </div>
    //                 );

    //             return (
    //                 <div className="ml-4 grow text-left">
    //                     <p
    //                         review-card-type="title"
    //                         className="text-sm font-bold md:text-base lg:text-xl"
    //                     >
    //                         {review.name}
    //                     </p>
    //                     <p
    //                         review-card-type="title"
    //                         className="w-11/12 text-sm md:text-sm xl:text-base"
    //                     >
    //                         {review.credentials}
    //                     </p>
    //                 </div>
    //             );
    //         })()}
    //     </div>
    // );
    // https://grainy-gradients.vercel.app/noise.svg
    return (
        <div
            className="card text-primary-content my-auto min-h-56 w-full max-w-[30rem] min-w-[30rem] rounded-l-4xl rounded-r-sm pl-4 bg-blend-soft-light"
            style={{
                background: `linear-gradient(to right, var(--color-primary), var(--color-primary)), url("${noise}")`,
            }}
        >
            <div className="absolute mt-4 h-6 w-6 shrink-0 self-start rounded-full bg-black"></div>
            <div className="card-body ml-2 justify-center py-0">
                <div className="inline-flex items-center justify-between">
                    <h2 className="card-title flex flex-col items-start justify-start gap-0 text-left text-xl">
                        {review.name}
                        <span className="text-sm">{review.credentials}</span>
                    </h2>
                    {review.ig_url && (
                        <a
                            className="btn btn-lg btn-square p-1"
                            href={review.ig_url}
                            target="_blank"
                        >
                            <BsInstagram className="size-7" />
                        </a>
                    )}
                </div>
                <span className="h-fit max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {review.content}
                </span>
            </div>
        </div>
    );
}

ReviewCard.propTypes = {
    review: PropTypes.object,
};

function ReviewModal({ review, onClose }) {
    return (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
            <div className="mx-auto max-w-lg rounded-sm bg-white p-6">
                <h4 className="mb-4 text-2xl font-bold">{review.name}</h4>
                <p className="mb-4">
                    <i>{review.credentials}</i>
                </p>
                <p className="mb-6 whitespace-pre-wrap">{review.content}</p>
                <button
                    name="Close Review"
                    className="rounded-sm border px-4 py-2 text-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

ReviewModal.propTypes = {
    review: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
