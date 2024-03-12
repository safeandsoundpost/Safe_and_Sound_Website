import { useState } from "react";
import PropTypes from "prop-types";

const reviews = [
    {
        name: "Dexter Wilson",
        credentials: "Director of Diabolika (2024)",
        content: "The Safe & Sound crew are true masters of their craft. I enjoyed collaborating with these professionals every step of the way. They were able to bring their creativity, expertise and experience to create an immersive sound design for my short film."
    },
    {
        name: "Jamie Hegland",
        credentials: "Director of FIGURES (2022)",
        content: "Their work ethic, great attitudes and quality of work make them an undeniable force in this industry. They completely surpassed my expectations and in the end, the sound was my favourite part of the film and was one of the biggest impacts on its success."
    },
    {
        name: "Jade Yurich",
        credentials: "Co-Director and Producer of FIGURES (2022)",
        content: "Working with the team at Safe & Sound felt like we were working with our best friends and family. They made the workdays very easy on us creatively and helped get our vision across every step of the way."
    },
    {
        name: "Erik Berg",
        credentials: "Director of First Born, and Local Water (2024)",
        content: "Working with Safe and Sound is an absolute joy. They are kind, collaborative, and so talented. The team elevated the film through their brilliant sound design and I can’t wait to work with them again."
    },
    {
        name: "Katie Uhlmann",
        credentials: "Director of When You Know You Know (2024)",
        content: "The team at Safe and Sound are energetic, creative, and technically proficient. They ask good questions and get into the lives of the characters and the world of the story. They are always dedicated to bringing the director’s vision to fruition while developing the ideas at the centre of the film into singular, engaging clarity."
    },
];

export default function Reviews() {
    const [selectedReview, setSelectedReview] = useState(null);

    return (
        <section id="reviews" className="flex flex-col items-center justify-center gap-10 py-10">
            <h2 className="text-4xl font-bold uppercase tracking-widest text-center text-secondary my-10">
        Reviews
            </h2>
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-8">
                    {reviews.slice(0, 3).map((review, index) => (
                        <ReviewCard
                            key={index}
                            name={review.name}
                            credentials={review.credentials}
                            onClick={() => setSelectedReview(review)}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-8">
                    {reviews.slice(3).map((review, index) => (
                        <ReviewCard
                            key={index + 3} 
                            name={review.name}
                            credentials={review.credentials}
                            onClick={() => setSelectedReview(review)}
                        />
                    ))}
                </div>
            </div>
            {selectedReview && (
                <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
            )}
        </section>
    );
}

function ReviewCard({ name, credentials, onClick }) {
    return (
        <button 
            className="flex w-[450px] h-[150px] items-center justify-start rounded-l-[2em] bg-white text-black overflow-hidden pl-10" 
            onClick={onClick}
        >
            <div className="h-6 w-6 rounded-full bg-black flex-shrink-0"></div> 
            <div className="ml-4 flex-grow text-left">
                <p className="text-xl font-bold">{name}</p>
                <p className="text-lg">{credentials}</p>
            </div>
        </button>
    );
}

ReviewCard.propTypes = {
    name: PropTypes.string.isRequired,
    credentials: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

function ReviewModal({ review, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded max-w-lg mx-auto">
                <h4 className="text-2xl font-bold mb-4">{review.name}</h4>
                <p className="mb-4"><i>{review.credentials}</i></p>
                <p className="mb-6 whitespace-pre-wrap">{review.content}</p>
                <button className="border px-4 py-2 rounded text-lg" onClick={onClose}>
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
