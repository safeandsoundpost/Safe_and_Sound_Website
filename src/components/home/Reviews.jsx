/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import PropTypes from "prop-types";

const reviews = [
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
    },
    {
        name: "Jade Yurich",
        credentials: "Co-Director and Producer of FIGURES (2022)",
        content:
            "Working with the team at Safe & Sound felt like we were working with our best friends and family. They made the workdays very easy on us creatively and helped get our vision across every step of the way.",
    },
    {
        name: "Erik Berg",
        credentials: "Director of First Born, and Local Water (2024)",
        content:
            "Working with Safe and Sound is an absolute joy. They are kind, collaborative, and so talented. The team elevated the film through their brilliant sound design and I can’t wait to work with them again.",
    },
    {
        name: "Katie Uhlmann",
        credentials: "Director of When You Know You Know (2024)",
        content:
            "The team at Safe and Sound are energetic, creative, and technically proficient. They ask good questions and get into the lives of the characters and the world of the story. They are always dedicated to bringing the director’s vision to fruition while developing the ideas at the centre of the film into singular, engaging clarity.",
    },
    {
        name: "Maxine Lemieux",
        credentials: "Director of A Great Big Terrible Dream (2022)",
        content:
            "I had a great time working with Safe & Sound on my thesis project. They made me feel welcomed and comfortable in a studio setting. They were willing to experiment and bring my film to a higher level. Because of them, it was awarded best sound design for a festival.",
    },
];

export default function Reviews() {
    const [selectedReview, setSelectedReview] = useState(null);

    return (
        <section
            id="reviews"
            className="m-auto flex w-10/12 flex-col items-center justify-center gap-10 py-10 md:m-auto md:w-10/12 xl:w-full"
        >
            <h2 className="my-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                Reviews
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
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
    const [onHover, setOnHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // just a workaround for touch events. Not the best solution.

    return (
        <div
            id="review-card"
            className="flex h-[130px] w-[300px] items-center justify-start 
            overflow-hidden rounded-l-[2em] border-2 border-black bg-white pl-10 text-black
            xs:h-[120px] xs:w-[400px] xs:pl-5
            md:h-[120px] md:w-[225px] md:pl-5
            lg:h-[130px] lg:w-[260px] lg:pl-6
            xl:w-[380px] xl:pl-10
            2xl:w-[450px] 2xl:pl-10"
            onTouchStart={(e) => {
                setIsMobile(true);

                /** @type {HTMLElement} */
                const target = e.target;
                if (target.getAttribute("review-card-type") === "content")
                    return;
                setOnHover(!onHover);
            }}
            onMouseEnter={() => {
                if (isMobile) return;
                setOnHover(true);
            }}
            onMouseLeave={() => {
                if (isMobile) return;
                setOnHover(false);
            }}
            onBlur={() => {
                setOnHover(false);
            }}
        >
            <div className="h-6 w-6 shrink-0 rounded-full bg-black"></div>
            {(() => {
                if (onHover)
                    return (
                        <div className="ml-4 flex h-full items-center text-left">
                            <p
                                review-card-type="content"
                                className="h-[80%] w-[95%] overflow-y-auto text-sm leading-tight md:text-xs xl:text-sm 2xl:text-base"
                            >
                                {review.content}
                            </p>
                        </div>
                    );

                return (
                    <div className="ml-4 grow text-left">
                        <p
                            review-card-type="title"
                            className="text-sm font-bold md:text-base lg:text-xl"
                        >
                            {review.name}
                        </p>
                        <p
                            review-card-type="title"
                            className="w-11/12 text-sm md:text-sm xl:text-base"
                        >
                            {review.credentials}
                        </p>
                    </div>
                );
            })()}
        </div>
    );
}

ReviewCard.propTypes = {
    review: PropTypes.object,
};

function ReviewModal({ review, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
