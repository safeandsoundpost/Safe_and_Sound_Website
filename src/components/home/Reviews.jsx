import PropTypes from "prop-types";

export default function Reviews() {
    return (
        <section
            id="reviews"
            className="flex w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                reviews
            </h2>

            <div className="flex w-full items-center justify-center gap-16 align-middle">
                <div className="flex w-[35%] flex-col gap-8">
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                </div>
                <div className="flex w-[35%] flex-col gap-8">
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                    <ReviewCard
                        text={
                            "maxine lemieux\nwriter/director\na great big terrible dream\n2022"
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function ReviewCard({ text }) {
    return (
        <div className="flex w-full items-center justify-evenly rounded-l-[2em] bg-white align-middle text-black">
            <div className="h-8 w-8 rounded-full bg-black" />
            <p className=" whitespace-pre py-5 text-xl uppercase leading-6">
                {text}
            </p>
        </div>
    );
}

ReviewCard.propTypes = {
    text: PropTypes.string.isRequired,
};
